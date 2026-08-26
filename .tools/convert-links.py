#!/usr/bin/env python3
"""
convert-links.py - rewrite wiki (OtterWiki) links for GitHub.

The wiki stores page attachments in a directory next to the page
(e.g. `Guides/Buyer's_Guide/strix-halo-specs.png` for `Guides/Buyer's_Guide.md`)
and links between pages with wiki-style `[[...]]` links. Both render
incorrectly on GitHub:

* Attachment links like `./strix-halo-specs.png` resolve relative to the
  page's own directory, missing the attachment directory, which produces
  broken `/blob/main/...` links.
* `[[alias|Target/Page]]` is not markdown at all.

This script rewrites:

1. Inline link/image destinations so they go through the page's attachment
   directory, e.g.

       ![](./strix-halo-specs.png)   ->   ![](./Buyer's_Guide/strix-halo-specs.png)

2. Wiki links into plain markdown links, e.g.

       [[EVO-X2|Hardware/PCs/GMKtec_EVO-X2]]
         ->  [EVO-X2](Hardware/PCs/GMKtec_EVO-X2.md)
       [[Hardware/Boards/Sixunited_AXB35]]
         ->  [Hardware/Boards/Sixunited_AXB35](Hardware/Boards/Sixunited_AXB35.md)
       [[OFFICIAL PRODUCT PAGE](https://example.com/page)]
         ->  [OFFICIAL PRODUCT PAGE](https://example.com/page)

Wiki link rules:
* `[[alias|target]]` keeps the alias as link text; `[[target]]` uses the last
  path component (page name) as text.
* `[[text](https://external.url)]` wraps a markdown link in wiki markup - the
  outer brackets are unwrapped, keeping the link itself untouched.
* Targets are resolved against the repo root, so a leading `/` is handled
  (`[[Power Mode and Fan Control|/Guides/...]]`), as are `#anchors`
  (`AI/AI_Capabilities_Overview#rocm` -> `AI/AI_Capabilities_Overview.md#rocm`).
* The `.md` suffix is added when the target is a page; targets that are
  directories (wiki sections like `Guides`, `AI`, `Hardware/PCs`) stay as
  directory links computed relative to the page.
* Targets that resolve to nothing are reported and left untouched.

Attachment link rules:
* Only relative destinations that look like attachments (image/pdf/zip/rom/
  bin/exe/... extension) are touched; external URLs, anchors, `.md` links and
  wiki `[[...]]` links are left alone.
* The wiki's option query strings (`?thumbnail`, `?thumbnail=200`) are kept as
  part of the destination to be used later in static page rendering.
* The target file is looked up in the page's attachment directory - a
  directory next to the page named after it, with `README.md -> README/` as
  the documented exception. If no such directory exists, the page's own
  directory is searched recursively by file name.
* Nested constructs like `[![alt](./x.jpg?thumbnail)](./x.jpg)` are handled -
  both destinations are rewritten.
* Already-rewritten links are detected and left untouched (idempotent).

Content inside fenced code blocks (```) is never touched.

Usage:
    python3 .tools/convert-links.py          # rewrite in place
    python3 .tools/convert-links.py --dry-run

Exit codes: 0 = all links accounted for; 1 = some links could not be resolved
(they are listed on stderr).
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Extensions considered "attachments" (i.e. files that live in the page's
# attachment directory rather than being other wiki pages).
ATTACHMENT_EXTS = {
    ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".avif",
    ".pdf", ".zip", ".rom", ".bin", ".exe", ".7z", ".tar", ".gz", ".xz",
    ".kcpps",
}

# Documented attachment-directory exceptions: page name -> directory name.
DOC_DIRS = {"README": "README"}

# Wiki embedded links: [[alias|target]] or [[target]].
WIKI_RE = re.compile(r"\[\[([^\[\]]+)\]\]")


# ---------------------------------------------------------------------------
# link parsing
# ---------------------------------------------------------------------------

def find_links(line: str) -> list[tuple[int, int, int, str]]:
    """Find inline links in `line`.

    Returns a list of (head_start, dest_start, dest_end, dest) tuples where
    the destination spans line[dest_start:dest_end]. Nested constructs like
    ``[![alt](./x.jpg)](./y.jpg)`` produce one entry per destination, in
    document order. Escaped characters (``\\[`` etc.) are handled.
    """
    links: list[tuple[int, int, int, str]] = []
    stack: list[int] = []          # positions of unmatched '['
    i = 0
    n = len(line)
    while i < n:
        ch = line[i]
        if ch == "\\" and i + 1 < n:
            i += 2
        elif ch == "[":
            stack.append(i)
            i += 1
        elif ch == "]" and i + 1 < n and line[i + 1] == "(" and stack:
            # scan the destination up to its closing ')', counting parens so
            # URLs containing '(' / ')' are still handled
            j = i + 2
            depth = 1
            while j < n and depth > 0:
                c = line[j]
                if c == "\\" and j + 1 < n:
                    j += 2
                    continue
                if c == "(":
                    depth += 1
                elif c == ")":
                    depth -= 1
                j += 1
            if depth == 0:
                head = stack.pop()
                dest_end = j - 1
                dest = line[i + 2:dest_end]
                if dest:
                    links.append((head, i + 2, dest_end, dest))
                i = j
                continue
            i += 1
        else:
            i += 1
    return links


# ---------------------------------------------------------------------------
# destination conversion (attachment links)
# ---------------------------------------------------------------------------

def is_attachment_name(name: str) -> bool:
    return Path(name).suffix.lower() in ATTACHMENT_EXTS


def find_attachment_dir(page: Path) -> Path | None:
    """Return the directory that holds this page's attachments, if any."""
    # 1. Directory named after the page, next to it (standard wiki layout).
    named = page.with_suffix("")
    if named.is_dir():
        return named

    # 2. Documented exceptions (README.md -> README/).
    if page.name in DOC_DIRS:
        doc_dir = page.parent / DOC_DIRS[page.name]
        if doc_dir.is_dir():
            return doc_dir

    # 3. Fallback: the page's own directory (used for pages that keep
    #    attachments inline or in an unconventionally named subdirectory).
    if any(f.is_file() for f in page.parent.iterdir()):
        return page.parent

    return None


def convert_dest(
    dest: str,
    page: Path,
    attach_dir: Path | None,
    warned: set[str],
) -> tuple[str | None, bool]:
    """Convert one attachment link destination.

    Returns (new_dest, changed); new_dest is None when the link could not be
    resolved (a warning is emitted once).
    """
    if not dest or dest.startswith(("http://", "https://", "mailto:", "#", "/")):
        return dest, False

    path_part, sep, query = dest.partition("?")
    if not is_attachment_name(path_part):
        return dest, False

    rel = os.path.normpath(path_part)
    if rel == "." or rel == ".." or rel.startswith("../"):
        return dest, False  # parent-relative paths are out of scope

    if attach_dir is None:
        key = f"{page}:{dest}"
        if key not in warned:
            warned.add(key)
            print(f"  ! no attachment directory for {dest!r} in {page}", file=sys.stderr)
        return None, False

    # The rewritten link must be relative to the page's own directory, so the
    # prefix is the path from the page's parent to the attachment file. This
    # works both for attachments in the named sibling directory and for pages
    # that keep attachments in their own directory (the fallback below).
    def rebuild(target: Path) -> str:
        relpath = os.path.relpath(target, page.parent).replace(os.sep, "/")
        prefix = "./" + relpath
        return prefix + (sep + query if sep else "")

    # Already in <attach_dir>/<file> form?
    direct = attach_dir / rel
    if direct.is_file():
        new = rebuild(direct)
        return (new, new != dest)

    # Otherwise look the file up by name inside the attachment directory.
    name = os.path.basename(rel)
    found = next((c for c in attach_dir.rglob(name) if c.is_file()), None)
    if found is None:
        key = f"{page}:{dest}"
        if key not in warned:
            warned.add(key)
            print(f"  ! skipped un-resolvable link {dest!r} in {page}", file=sys.stderr)
        return None, False

    new = rebuild(found)
    return new, new != dest


def process_line(
    line: str,
    page: Path,
    attach_dir: Path | None,
    warned: set[str],
) -> tuple[str, int, int]:
    """Rewrite attachment destinations inside one line.

    Returns (new_line, changed, skipped).
    """
    links = find_links(line)
    if not links:
        return line, 0, 0

    changed = skipped = 0
    parts: list[str] = []
    cursor = 0
    for _, dstart, dend, dest in links:
        new_dest, is_changed = convert_dest(dest, page, attach_dir, warned)
        if not is_changed:
            if new_dest is None:
                skipped += 1
            continue
        parts.append(line[cursor:dstart])
        parts.append(new_dest)
        cursor = dend
        changed += 1

    if not changed:
        return line, 0, skipped

    parts.append(line[cursor:])
    return "".join(parts), changed, skipped


# ---------------------------------------------------------------------------
# destination conversion (wiki links)
# ---------------------------------------------------------------------------

def resolve_wiki_target(raw: str) -> Path | None:
    """Resolve a wiki link target against the repo root.

    Returns the file (for pages) or directory (for wiki sections), or None
    when the target does not exist.
    """
    if not raw or raw.startswith(("#", "http://", "https://", "mailto:")):
        return None
    norm = os.path.normpath(raw.strip("/"))
    if norm.startswith("..") or os.path.isabs(norm):
        return None

    candidate = ROOT / norm
    if candidate.is_file():
        return candidate
    if (ROOT / (norm + ".md")).is_file():
        return ROOT / (norm + ".md")
    if candidate.is_dir():
        return candidate
    # maybe the target already ends with .md but transitively contains one?
    return None


def convert_wikilinks(
    line: str,
    page: Path,
    warned: set[str],
) -> tuple[str, int, int]:
    """Rewrite wiki-style [[...]] links inside one line.

    Returns (new_line, changed, skipped).
    """
    if "[[" not in line:
        return line, 0, 0

    changed = skipped = 0

    def repl(match: re.Match[str]) -> str:
        nonlocal changed, skipped
        content = match.group(1)
        alias, sep, target = content.partition("|")
        if not sep:
            alias, target = "", content.strip()
        else:
            alias, target = alias.strip(), target.strip()

        raw_target, hash_sep, fragment = target.partition("#")
        resolved = resolve_wiki_target(raw_target)
        if resolved is None:
            key = f"{page}:[[{content}]]"
            if key not in warned:
                warned.add(key)
                print(f"  ! skipped un-resolvable wiki link [[{content}]] in {page}",
                      file=sys.stderr)
            skipped += 1
            return match.group(0)

        # Link text: the alias when given, otherwise the page/section name
        # (the wiki would render the page title; the file name is the closest
        # substitute we have).
        text = alias
        if not text:
            name = os.path.basename(str(resolved))
            if name.endswith(".md"):
                name = name[:-3]
            text = name

        rel = os.path.relpath(resolved, page.parent).replace(os.sep, "/")
        if not rel.startswith((".", "/")):
            rel = "./" + rel
        if hash_sep and fragment:
            rel += "#" + fragment

        changed += 1
        return f"[{text}]({rel})"

    new_line = WIKI_RE.sub(repl, line)
    return new_line, changed, skipped


# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description="Rewrite wiki attachment and [[...]] links so they work on GitHub.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "-n", "--dry-run", action="store_true",
        help="report changes without writing to files",
    )
    args = parser.parse_args()

    warned: set[str] = set()
    total_changed = total_skipped = 0
    pages = sorted(ROOT.rglob("*.md"))

    for page in pages:
        attach_dir = find_attachment_dir(page)
        lines = page.read_text(encoding="utf-8").splitlines(keepends=True)

        in_fence = False
        changed = skipped = 0
        for idx, line in enumerate(lines):
            stripped = line.lstrip()
            if stripped.startswith("```"):
                in_fence = not in_fence
                continue
            if in_fence:
                continue

            new_line, c, s = process_line(line, page, attach_dir, warned)
            changed += c
            skipped += s
            if c:
                lines[idx] = new_line
                line = new_line

            new_line, c, s = convert_wikilinks(line, page, warned)
            changed += c
            skipped += s
            if c:
                lines[idx] = new_line

        total_changed += changed
        total_skipped += skipped
        if changed:
            print(f"{page.relative_to(ROOT)}: {changed} link(s) rewritten")
        if changed and not args.dry_run:
            page.write_text("".join(lines), encoding="utf-8")

    print(
        f"\n{len(pages)} page(s) scanned, {total_changed} link(s) rewritten, "
        f"{total_skipped} skipped."
    )
    if args.dry_run:
        print("(dry run - no files were modified)")
    return 1 if total_skipped else 0


if __name__ == "__main__":
    sys.exit(main())