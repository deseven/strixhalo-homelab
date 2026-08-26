#!/usr/bin/env python3
"""
convert-markdown.py - rewrite GitHub-incompatible markdown for GitHub.

The wiki is authored in Obsidian, which uses ``:::type`` callouts that GitHub
does not render:

    :::info
    # Watching this video might help to understand the basics
    https://www.youtube.com/watch?v=HMTy3jQc39A
    :::

GitHub renders admonitions ("alerts") as blockquotes:

    > [!NOTE]
    > # Watching this video might help to understand the basics
    > https://www.youtube.com/watch?v=HMTy3jQc39A

This script rewrites:

1. Obsidian ``:::type`` callout blocks into GitHub alerts::

       :::info                    ->   > [!NOTE]
       content                     ->   > content
       :::                         ->   (removed)

   * Obsidian types are mapped onto the GitHub alert keywords:

         note, info, abstract, summary, tldr, question, help, faq,
         example, quote, cite           ->  NOTE
         tip, hint, success, check,
         done                            ->  TIP
         important                       ->  IMPORTANT
         warning, danger, failure,
         fail, missing, bug              ->  WARNING
         caution                         ->  CAUTION

   * A callout title on the opener line is kept (GitHub supports alert
     titles): ``:::info Title`` becomes ``> [!NOTE] Title``.
   * Nested callouts are supported; inner alerts get one ``> `` per
     nesting level.
   * Blank lines inside a callout become bare ``>`` lines so the
     blockquote stays unbroken.
   * Blocks may be indented (e.g. inside a list item); the original
     indentation is kept in front of the ``>`` markers.
   * Unknown callout types, stray closing tags, and unclosed blocks are
     reported on stderr and left alone (exit code 1).

2. Content inside fenced code blocks (``` or ~~~) is never touched.

Usage:
    python3 .tools/convert-markdown.py          # rewrite in place
    python3 .tools/convert-markdown.py --dry-run

Exit codes: 0 = everything converted; 1 = something was left behind.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Obsidian callout type -> GitHub alert keyword.
ALERT_TYPES: dict[str, str] = {
    # info-ish
    "note": "NOTE",
    "info": "NOTE",
    "abstract": "NOTE",
    "summary": "NOTE",
    "tldr": "NOTE",
    "question": "NOTE",
    "help": "NOTE",
    "faq": "NOTE",
    "example": "NOTE",
    "quote": "NOTE",
    "cite": "NOTE",
    # tip-ish
    "tip": "TIP",
    "hint": "TIP",
    "success": "TIP",
    "check": "TIP",
    "done": "TIP",
    # emphatic
    "important": "IMPORTANT",
    # warning-ish
    "warning": "WARNING",
    "danger": "WARNING",
    "failure": "WARNING",
    "fail": "WARNING",
    "missing": "WARNING",
    "bug": "WARNING",
    # GitHub's dedicated keyword
    "caution": "CAUTION",
}

# :::type[ title]
OPEN_RE = re.compile(r"^:::(?P<type>[A-Za-z][A-Za-z0-9_-]*)(?P<title>.*)$")

# ``` or ~~~ opens a fenced code block.
FENCE_RE = re.compile(r"^(```+|~~~+)")


def parse_opener(body: str) -> tuple[str, str] | None:
    """Split a ``:::type ...`` line into (type, title), or None."""
    m = OPEN_RE.match(body)
    if not m:
        return None
    return m.group("type").lower(), m.group("title").strip()


def convert_lines(
    lines: list[str],
    path: Path,
) -> tuple[list[str], int, int]:
    """Convert one file's lines; returns (new lines, changed, skipped)."""
    out: list[str] = []
    in_fence = False          # inside a top-level fenced code block
    depth = 0                 # current callout nesting depth
    in_callout_fence = False  # inside a fenced block within the callout
    open_line = 0             # 1-based line of the outermost callout opener
    changed = skipped = 0
    rel = path.relative_to(ROOT)

    def issue(msg: str, lineno: int) -> None:
        nonlocal skipped
        skipped += 1
        print(f"  ! {msg} in {rel} (line {lineno})", file=sys.stderr)

    for lineno, line in enumerate(lines, start=1):
        stripped = line.lstrip()
        indent = line[: len(line) - len(stripped)]

        if in_fence:
            if FENCE_RE.match(stripped):
                in_fence = False
            out.append(line)
            continue

        if depth > 0:
            # inside a callout block
            if FENCE_RE.match(stripped):
                in_callout_fence = not in_callout_fence
                out.append(indent + "> " * depth + stripped)
                continue

            body = stripped.strip()

            if not in_callout_fence and body == ":::":
                depth -= 1
                if depth == 0:
                    in_callout_fence = False
                continue

            if not in_callout_fence:
                parsed = parse_opener(body)
                if parsed:
                    otype, title = parsed
                    gh = ALERT_TYPES.get(otype)
                    if gh:
                        depth += 1
                        suffix = f" {title}" if title else ""
                        out.append(
                            indent + "> " * (depth - 1) + f"> [!{gh}]{suffix}\n"
                        )
                        continue
                    issue(
                        f"unknown callout type {otype!r}, kept as literal content",
                        lineno,
                    )
                    out.append(indent + "> " * depth + stripped)
                    continue

            if not stripped:
                out.append(indent + ">" * depth + "\n")
                continue
            out.append(indent + "> " * depth + stripped)
            continue

        # top level, outside fences and callouts
        if FENCE_RE.match(stripped):
            in_fence = True
            out.append(line)
            continue

        body = stripped.strip()

        parsed = parse_opener(body)
        if parsed:
            otype, title = parsed
            gh = ALERT_TYPES.get(otype)
            if gh:
                depth = 1
                open_line = lineno
                suffix = f" {title}" if title else ""
                out.append(indent + f"> [!{gh}]{suffix}\n")
                changed += 1
                continue
            issue(f"unknown callout type {otype!r}, left untouched", lineno)
            out.append(line)
            continue

        if body == ":::":
            issue("stray closing tag, left untouched", lineno)
            out.append(line)
            continue

        out.append(line)

    if depth > 0:
        issue(
            f"unclosed callout opened on line {open_line}, "
            "block runs to end of file",
            open_line,
        )
    return out, changed, skipped


# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(
        description="Rewrite Obsidian `:::` callouts as GitHub alerts.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "-n", "--dry-run", action="store_true",
        help="report changes without writing to files",
    )
    args = parser.parse_args()

    total_changed = total_skipped = 0
    pages = sorted(ROOT.rglob("*.md"))

    for page in pages:
        lines = page.read_text(encoding="utf-8").splitlines(keepends=True)
        new_lines, changed, skipped = convert_lines(lines, page)
        total_changed += changed
        total_skipped += skipped
        if changed:
            print(f"{page.relative_to(ROOT)}: {changed} callout(s) converted")
        if changed and not args.dry_run:
            page.write_text("".join(new_lines), encoding="utf-8")

    print(
        f"\n{len(pages)} page(s) scanned, {total_changed} callout(s) converted, "
        f"{total_skipped} issue(s)."
    )
    if args.dry_run:
        print("(dry run - no files were modified)")
    return 1 if total_skipped else 0


if __name__ == "__main__":
    sys.exit(main())