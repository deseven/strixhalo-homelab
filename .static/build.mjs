// build.mjs - static site generator.
// Reads the wiki markdown from the repo root and emits a set of static,
// interlinked HTML pages into .static/dist.
//
//   node build.mjs          # build once
//   node build.mjs --watch  # rebuild on changes
//
// Env (from .static/.env):
//   GH_REPO  GitHub repo hosting the wiki as `user/repo[/branch]`; raw
//            attachment and GitHub page links are derived from it
//   CLEAN_URLS  when 'true', internal *links* are emitted without the
//            `.html` suffix (files are still written as `key.html` - the
//            webserver should rewrite extension-less paths onto them).
//            The wiki entry point is always `index.html`. Default: off.

import fs from "node:fs";
import path from "node:path";
import ejs from "ejs";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import githubAlerts from "markdown-it-github-alerts";
import { format } from "prettier";
import { readFileSync } from "node:fs";

const SRC_DIR = path.dirname(new URL(import.meta.url).pathname); // .static/
const prettierOptions = JSON.parse(readFileSync(path.join(SRC_DIR, ".prettierrc.json"), "utf8"));

// ---------------------------------------------------------------------------
// config & env
// ---------------------------------------------------------------------------

const SELF = path.dirname(new URL(import.meta.url).pathname); // .static/
const ROOT = path.resolve(SELF, "..");                         // repo root
const DIST = path.join(SELF, "dist");

const MD = ".md";
const HTML = ".html";

const SITE_NAME = "Strix Halo HomeLab Wiki";
const HOME_PAGE = "README"; // key of the page linked from the sidebar logo

function loadEnv() {
  const vars = {};
  try {
    const raw = fs.readFileSync(path.join(SELF, ".env"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m) vars[m[1]] = m[2].trim();
    }
  } catch {
    // missing .env - fall through to defaults below
  }
  return vars;
}

const ENV = loadEnv();

// When CLEAN_URLS=true every internal page link drops its `.html` suffix
// (files are still written as `key.html`; the webserver is expected to
// rewrite the extension-less path onto the .html file).
const CLEAN_URLS = (ENV.CLEAN_URLS || "").trim().toLowerCase() === "true";

// GH_REPO is the single source of truth for where the wiki lives, e.g.
// `deseven/strixhalo-homelab` or `deseven/strixhalo-homelab/static_pages`.
// The raw URL base and the GitHub blob (page) URL base are derived from it.
const GH_REPO = (ENV.GH_REPO || "").trim().replace(/\/+$/, "");
const GH_MATCH = /^([^/]+)\/([^/]+)(?:\/([^/]+))?$/.exec(GH_REPO);
if (!GH_MATCH) {
  console.error(
    "GH_REPO is not set in .static/.env (see .env.example), expected user/repo[/branch]"
  );
  process.exit(1);
}
const [, GH_USER, GH_REPO_NAME, GH_REF] = GH_MATCH; // GH_REF may be undefined
const GH_REF_URL = GH_REF || "HEAD"; // HEAD resolves to the default branch

// e.g. https://raw.githubusercontent.com/deseven/strixhalo-homelab/static_pages/
const RAW_GH = `https://raw.githubusercontent.com/${GH_USER}/${GH_REPO_NAME}/${GH_REF_URL}/`;
// e.g. https://github.com/deseven/strixhalo-homelab/blob/static_pages/
const BLOB_GH = `https://github.com/${GH_USER}/${GH_REPO_NAME}/blob/${GH_REF_URL}/`;
// e.g. https://github.com/deseven/strixhalo-homelab/tree/static_pages/
const TREE_GH = `https://github.com/${GH_USER}/${GH_REPO_NAME}/tree/${GH_REF_URL}/`;

// ---------------------------------------------------------------------------
// collecting pages
// ---------------------------------------------------------------------------

/** All repo-root-relative md paths that are wiki pages (skip attachment dirs). */
function collectPages() {
  const mds = [];
  walk(ROOT, (p, isDir) => {
    if (isDir) return true; // continue
    if (p.endsWith(MD)) mds.push(p);
  });

  // a directory is an "attachment dir" when it contains no md files at all
  const hasMd = (relDir) => mds.some((p) => p.startsWith(relDir + "/"));
  const pages = mds.filter((p) => {
    const dir = path.posix.dirname(p);
    return dir === "." || hasMd(dir);
  });
  return pages.sort();
}

function walk(dir, cb, rel = "") {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.name.startsWith(".")) continue; // ignore dotfiles/dirs
    const p = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) {
      if (walk(path.join(dir, e.name), cb, p) !== false && cb(p, true) === false) return false;
    } else {
      cb(p, false);
    }
  }
}

const pageKeys = collectPages().map((p) => p.slice(0, -MD.length));
const allKeys = new Set(pageKeys);

/**
 * All directories that contain wiki pages, used to generate "directory
 * index" pages for any directory that has no page of its own (e.g. the
 * `Hardware` dir has pages underneath but no `Hardware.md`). Every ancestor
 * of a page is a candidate (so `Hardware`, `Hardware/Boards`, … all get an
 * entry). Values hold nothing - the listing is derived on the fly in
 * `dirListing()`.
 */
const dirIndexes = new Set();
for (const key of pageKeys) {
  const parts = key.split("/");
  for (let i = 1; i < parts.length; i++) {
    dirIndexes.add(parts.slice(0, i).join("/"));
  }
}

/** Keys of pages to build: real .md pages plus auto-generated dir index pages. */
const buildKeys = pageKeys.slice();
for (const dir of [...dirIndexes].sort()) {
  if (!allKeys.has(dir)) buildKeys.push(dir); // no real page for this dir
}

// ---------------------------------------------------------------------------
// document model
// ---------------------------------------------------------------------------

function slugify(text) {
  return text
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^\w\- ]+/g, "")
    .trim()
    .replace(/ /g, "-")
    .replace(/-+/g, "-");
}

/** Parse h1 title + first paragraph as summary. */
function parseMeta(md) {
  const lines = md.split("\n");
  let title = null;
  let inCode = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) inCode = !inCode;
    if (inCode) continue;
    const m = /^\s*#\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) {
      title = m[1].trim();
      break;
    }
    // no h1 yet - use first image alt as fallback (README starts with a hero img)
    if (!title) {
      const img = /^!\[([^\]]*)\]\(/.exec(line);
      if (img && img[1].trim()) title = img[1].trim();
    }
  }
  return { title };
}

const titleFromKey = (key) =>
  path.posix.basename(key).replace(/_/g, " ").replace(/\.\w+$/, "");

// ---------------------------------------------------------------------------
// link rewriting
// ---------------------------------------------------------------------------

/** Percent-encode path segments for URLs (keeps /, encodes spaces etc.). */
function encUrl(p) {
  return p
    .split("/")
    .map((s) => encodeURIComponent(s).replace(/%20/g, " "))
    .join("/");
}

/** Case-insensitive existence check under dir. Returns matching file or null. */
function findFile(dir, name) {
  const exact = path.join(dir, name);
  if (fs.existsSync(exact)) return name;
  let entries;
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return null;
  }
  const hit = entries.find((e) => e.toLowerCase() === name.toLowerCase());
  return hit || null;
}

/** Resolve a repo-rooted path (with . or .. segments) against a base dir. */
function resolve(base, target) {
  const out = [];
  const parts = (base.split("/").filter(Boolean)).concat(target.split("/"));
  for (const p of parts) {
    if (p === "." || p === "") continue;
    if (p === "..") out.pop();
    else out.push(p);
  }
  return out.join("/");
}

/** Convert a repo-rooted path to a raw GitHub URL (attachments). */
function rawUrl(repoPath) {
  return RAW_GH + encUrl(repoPath);
}

/** Convert a repo-rooted path to its GitHub blob (view page) URL. */
function blobUrl(repoPath) {
  return BLOB_GH + encUrl(repoPath);
}

/**
 * Parse a `?thumbnail[=N]` size hint from a link destination.
 * Returns the max width in px (default 64) or null when absent.
 * Anything that isn't an integer is ignored so `?thumbnail=foo` is
 * treated as a plain unknown query string.
 */
function parseThumb(href) {
  const m = /[?&]thumbnail(?:=(\d+))?(?:&|$)/i.exec(href);
  if (!m) return null;
  return Number(m[1] || 64);
}

/**
 * Rewrites an href that appears in page `ctx.key` (repo-rooted key).
 * Handles: external urls, #anchors, .md page links, attachment links,
 * directory links.
 */
function rewriteHref(href, ctx) {
  href = decodeURIComponent(href);
  if (!href || href === "#") return href;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) return href; // external

  // split off anchor / query
  const hashIdx = href.indexOf("#");
  const hash = hashIdx >= 0 ? href.slice(hashIdx) : "";
  const qIdx = href.indexOf("?");
  const query = qIdx >= 0 ? href.slice(qIdx) : "";
  let dest = href.slice(0, Math.min(hashIdx >= 0 ? hashIdx : href.length, qIdx >= 0 ? qIdx : href.length));
  if (!dest) return href;
  // `?thumbnail[=N]` is a size hint, not part of the file path - keep it out
  // of the URL (it would break attachment links on raw.githubusercontent.com)
  const cleanQuery = /\?thumbnail/.test(query) ? "" : query;

  const relToRoot = dest.startsWith("/");
  const target = relToRoot ? dest.slice(1) : resolve(path.posix.dirname(ctx.key), dest);

  if (target.endsWith(MD)) {
    const key = target.slice(0, -MD.length);
    if (allKeys.has(key)) {
      return relPageHref(ctx.key, key) + (hash || cleanQuery);
    }
    return href; // unknown md target - leave as is
  }
  // A directory key that has a generated index page links to that page
  // (works for both root-relative and page-relative targets; the trailing
  // slash is stripped so bare dir keys / dir/ URLs both match).
  const targetNoSlash = target.replace(/\/+$/, "");
  if (targetNoSlash && dirIndexes.has(targetNoSlash)) {
    return relDirHref(ctx.key, targetNoSlash) + (hash || cleanQuery);
  }
  if (relToRoot) {
    // root-relative link to an attachment or dir
    if (fileExists(target)) return rawUrl(target) + (hash || cleanQuery);
    return target + "/"; // directory link
  }
  const resolved = resolveFile(target);
  if (resolved) return rawUrl(resolved) + (hash || cleanQuery);
  // directory link (relative to page)
  return dest + "/";
}

/**
 * True when repoPath resolves to an existing *file* (not a directory).
 * Segments are matched case-insensitively (macOS fs is case-insensitive,
 * and a few pages reference images with different casing than the actual
 * files, e.g. `Aoostar_NEX395` dir vs `aoostar-nex395.jpg`).
 * Returns the actual repo-relative path (with real casing) or null.
 */
function resolveFile(repoPath) {
  if (!repoPath) return null;
  let cur = ROOT;
  const parts = repoPath.split("/").filter(Boolean);
  const actual = [];
  for (let i = 0; i < parts.length; i++) {
    const hit = findFile(cur, parts[i]);
    if (!hit) return null;
    cur = path.join(cur, hit);
    actual.push(hit);
    const st = fs.statSync(cur);
    if (i < parts.length - 1 && !st.isDirectory()) return null;
    if (i === parts.length - 1 && !st.isFile()) return null;
  }
  return actual.join("/");
}

function fileExists(repoPath) {
  return !!resolveFile(repoPath);
}

/** Output file name for a page key (the wiki entry point is index.html). */
function pageFile(key) {
  return key === HOME_PAGE ? "index.html" : key + HTML;
}

/**
 * Repo-rooted URL used when *linking* to page `key`. In clean-url mode the
 * `.html` suffix is dropped (the server rewrites the path); the entry point
 * collapses to the wiki root (""), served as index.html. In default mode the
 * entry point is linked as a plain `index.html`.
 */
function pageUrl(key) {
  if (key === HOME_PAGE) return CLEAN_URLS ? "" : "index.html";
  return CLEAN_URLS ? key : key + HTML;
}

/**
 * Relative href from page `fromKey` to a generated index page `toDir`
 * (a dir key without suffix). The index page lives at `toDir + ".html"`;
 * in clean-url mode the link is the bare directory path (the server
 * rewrites it to the .html file). The base is the *page's* directory (the
 * page is a real file somewhere in the tree, so
 * `dirname(fromKey + ".html")` is its containing dir).
 */
function relDirHref(fromKey, toDir) {
  const fromBase = path.posix.dirname(fromKey + HTML);
  let rel;
  if (CLEAN_URLS) {
    // Bare dir path = its clean URL. When the page lives *inside* the target
    // dir itself the relative path is empty; the dir's page is then a sibling
    // one level up (`Hardware/PCs` from within it -> `../PCs`).
    rel = path.posix.relative(fromBase, toDir);
    if (!rel) rel = "../" + path.posix.basename(toDir);
  } else {
    rel = path.posix.relative(fromBase, toDir + HTML);
  }
  if (!rel.startsWith(".")) rel = "./" + rel;
  return rel;
}

/**
 * Relative href from page `from` to page `to` (both keys without suffix).
 * The base is always the containing dir of the *source page file* (for an
 * extension-less clean URL the browser also resolves relative links from
 * that directory, so the two base computations agree). In clean-url mode
 * the target loses its `.html` suffix; in default mode it is
 * `to + ".html"`. The wiki entry point (HOME_PAGE) is always linked as
 * `index.html` in default mode, and as the wiki root in clean-url mode
 * (`../`, `../../`, …), which the server serves as the entry page.
 */
function relPageHref(from, to) {
  const fromBase = path.posix.dirname(from + HTML);
  let rel;
  if (to === HOME_PAGE) {
    if (CLEAN_URLS) {
      // wiki root: ascend to the site root directory
      rel = fromBase === "." ? "./" : "../".repeat(fromBase.split("/").length);
    } else {
      rel = path.posix.relative(fromBase, "index.html");
    }
  } else {
    rel = path.posix.relative(fromBase, pageUrl(to));
    // Linking to the page that *represents* the source page's own directory
    // (e.g. `Sixunited_AXB35` from `Sixunited_AXB35/Power_Mode_and_Fan_Control`)
    // yields an empty relative path in clean mode; the target is a sibling
    // one level up (`../Sixunited_AXB35`).
    if (!rel && CLEAN_URLS) rel = "../" + path.posix.basename(to);
  }
  if (!rel.startsWith(".")) rel = "./" + rel;
  return rel;
}

/**
 * GitHub renders tables inside blockquotes (`>| ...`) as real tables;
 * markdown-it does not. Convert those blockquotes to plain markdown so the
 * tables render. `>|# Name` becomes an `## Name` heading (vendor sections).
 * Blocks that are not tables (plain `> text`) are not affected because we
 * only transform lines that start with `>|`.
 */
function unwrapBlockquoteTables(md) {
  const out = [];
  for (const line of md.split("\n")) {
    if (/^>\|/.test(line)) {
      const inner = line.replace(/^>\s*\|/, ""); // drop the `>|` prefix
      if (/^#\s+/.test(inner)) {
        out.push(inner.replace(/^#\s+/, "## ")); // `>|# Name` -> `## Name`
      } else if (/^\|\s*:?-+:?\s*\|$/.test(inner.trim())) {
        out.push(inner); // separator row: keep as-is
      } else {
        out.push(inner); // regular table row
      }
    } else {
      out.push(line); // leave everything else untouched
    }
  }
  return out.join("\n");
}

/**
 * Transform legacy wiki `[[...]]` links into plain markdown inline links,
 * skipping fenced code blocks. Targets are repo-root based.
 */
function unwrapWikiLinks(md, ctx) {
  const lines = md.split("\n");
  let inCode = false;
  const out = [];
  for (const line of lines) {
    if (/^\s*```/.test(line)) inCode = !inCode;
    if (inCode) {
      out.push(line);
      continue;
    }
    out.push(line.replace(/\[\[([^\]]+)\]\]/g, (whole, inner) => {
      // [[text](https://…)] - outer brackets are redundant
      const m = /^([^\[]*)\]\((https?:\/\/[^)]+)\)$/.exec(inner);
      if (m) return `[${m[1]}](<${m[2]}>)`;
      const slash = inner.lastIndexOf("|");
      if (slash >= 0) {
        const alias = inner.slice(0, slash).trim();
        const target = inner.slice(slash + 1).trim();
        return `[${alias}](${target})`;
      }
      return `[${inner.replace(/_/g, " ")}](${inner})`;
    }));
  }
  return out.join("\n");
}

// ---------------------------------------------------------------------------
// rendering
// ---------------------------------------------------------------------------

function makeMd(ctx) {
  const md = new MarkdownIt({ html: true, linkify: true });
  md.use(anchor, { slugify });
  md.use(githubAlerts);
  md.renderer.rules.link_open = (tokens, idx, opts, env, self) => {
    const href = tokens[idx].attrGet("href");
    if (!href) return self.renderToken(tokens, idx, opts);
    const rewritten = href.startsWith("#") ? href : rewriteHref(href, ctx);
    tokens[idx].attrSet("href", rewritten);
    // External links (http/https or protocol-relative) open in a new tab,
    // with noopener so the new page can't reach back into this window.
    if (/^(?:https?:)?\/\//i.test(rewritten)) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrSet("rel", "noopener");
    }
    return self.renderToken(tokens, idx, opts);
  };
  md.renderer.rules.image = (tokens, idx, opts, env, self) => {
    const src = tokens[idx].attrGet("src");
    if (src) {
      const size = parseThumb(src);
      // thumbnail is a sizing hint - drop it from the URL and cap the width
      tokens[idx].attrSet("src", rewriteHref(src, ctx));
      if (size !== null && !tokens[idx].attrGet("width")) {
        tokens[idx].attrSet("style", `max-width:${size}px`);
      }
    }
    return self.renderToken(tokens, idx, opts);
  };
  return md;
}

// ---------------------------------------------------------------------------
// page tree
// ---------------------------------------------------------------------------

/** Build the nested page tree from page keys (dirs with pages only). */
function buildTree() {
  const root = { name: "", children: [] };
  for (const key of pageKeys) {
    const parts = key.split("/");
    let node = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;
      let child = node.children.find((c) => c.name === part && c.isFile === isFile);
      if (!child) {
        child = { name: part, isFile, key: isFile ? parts.slice(0, i + 1).join("/") : null, children: isFile ? null : [] };
        node.children.push(child);
      }
      node = child;
    }
  }
  const sort = (node) => {
    if (!node.children) return;
    node.children.sort((a, b) => {
      if (a.isFile !== b.isFile) return a.isFile ? 1 : -1; // dirs first
      return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
    });
    node.children.forEach(sort);
  };
  sort(root);
  return root;
}

function prettyName(name) {
  return name.replace(/_/g, " ");
}

const AMP = String.fromCharCode(38); // "&" - avoids literal entities in this file

function escapeHtml(s) {
  return s
    .replace(/&/g, AMP + "amp;")
    .replace(/</g, AMP + "lt;")
    .replace(/>/g, AMP + "gt;")
    .replace(/"/g, AMP + "quot;");
}

/**
 * Render the page tree as Web Awesome <wa-tree> markup.
 *
 * Web Awesome's `wa-tree` requires a single `<wa-tree>` root element - it
 * owns the parent context, keyboard/mouse expand handling, and the slot
 * wiring that turns a nested `wa-tree-item` into an expandable branch. The
 * branches are `<wa-tree-item>` elements; nested `wa-tree-item` children are
 * declared with `slot="children"` (assigned to the parent's `children` slot,
 * so `isLeaf` is false and the expand button renders) and `role="treeitem"`
 * (an AOM requirement the component relies on to find nested items).
 *
 * Every row (leaf page, directory header, Home) carries `data-path` = its
 * repo-rooted key so site.js can search full paths including directories.
 */
function renderTree(activeKey) {
  const tree = buildTree();
  const lines = [];
  const walk = (node, depth, isNested, pathParts) => {
    const nested = isNested ? ' slot="children" role="treeitem"' : "";
    for (const child of node.children) {
      // The README page is rendered as the Home entry (rendered separately
      // below); do not emit a second "README" row for the same page.
      if (child.isFile && child.key === HOME_PAGE) continue;
      const childPath = [...pathParts, child.name].join("/");
      if (child.isFile) {
        const key = child.key; // full key
        const href = relPageHref(activeKey, key);
        const active = key === activeKey;
        const attrs = (active ? " selected" : "") + nested;
        lines.push(
          `  <wa-tree-item${attrs}>` +
          `<a href="${href}" data-path="${escapeHtml(key)}"` +
          (active ? ' aria-current="page"' : "") +
          `>${escapeHtml(prettyName(path.posix.basename(child.name)))}</a>` +
          `</wa-tree-item>`
        );
      } else {
        const branchActive = activeKey === childPath || activeKey.startsWith(childPath + "/");
        // Headers link to the directory's page (its own .md, or the generated index)
        const dirKey = childPath;
        const href = allKeys.has(dirKey)
          ? relPageHref(activeKey, dirKey)
          : relDirHref(activeKey, dirKey);
        lines.push(
          `  <wa-tree-item${branchActive ? " expanded" : ""}${nested}>` +
          `<a class="tree-section-header" href="${href}" data-path="${escapeHtml(dirKey)}"` +
          (branchActive ? ' aria-current="page"' : "") +
          `>${escapeHtml(prettyName(path.posix.basename(child.name)))}</a>`
        );
        walk(child, depth + 1, true, childPath.split("/"));
        lines.push(`  </wa-tree-item>`);
      }
    }
  };
  const items = [];
  // Home first, then the rest of the tree.
  if (pageKeys.includes(HOME_PAGE)) {
    const active = activeKey === HOME_PAGE;
    items.push(
      `  <wa-tree-item${active ? " selected" : ""}>` +
      `<a href="${relPageHref(activeKey, HOME_PAGE)}" data-path="${HOME_PAGE}"` +
      (active ? ' aria-current="page"' : "") + `>Home</a>` +
      `</wa-tree-item>`
    );
  }
  walk(tree, 0, false, []);
  items.push(...lines);
  return `<wa-tree>${items.join("\n")}</wa-tree>`;
}

// ---------------------------------------------------------------------------
// toc
// ---------------------------------------------------------------------------

function extractToc(html) {
  const re = /<h([2-4])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/g;
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    out.push({
      level: Number(m[1]),
      id: m[2],
      text: m[3].replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim(),
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// directory index content
// ---------------------------------------------------------------------------

/**
 * Build the list of direct children (one level deep) of a directory, as a
 * flat markdown list. Subdirectories are linked to their own page when one
 * exists, otherwise to the generated index page; pages are linked to their
 * rendered page. Targets are emitted as repo-relative keys so the normal
 * link-rewrite machinery converts them to `.html` pages.
 * Used for directories that have no page of their own (e.g. the `Hardware`
 * dir has pages underneath but no `Hardware.md`).
 */
function dirListing(dir, ctx) {
  const prefix = dir + "/";
  // immediate subdirectories that do NOT have their own page (a same-named
  // .md represents the dir itself, so it's already listed as a page)
  const subDirs = [...dirIndexes]
    .filter((d) => d.startsWith(prefix) && !d.slice(prefix.length).includes("/") && !allKeys.has(d))
    .sort();
  // pages living directly in this dir
  const files = pageKeys
    .filter((k) => path.posix.dirname(k) === dir)
    .sort();

  const lines = [];
  // Encode each segment so spaces become %20 (markdown-it breaks on raw
  // spaces in destinations); rewriteHref decodes them back before resolving.
  const enc = (p) => p.split("/").map(encodeURIComponent).join("/");
  for (const d of subDirs) {
    const name = prettyName(path.posix.basename(d));
    // root-relative dir key (with trailing `/`) so rewriteHref links to the
    // generated index page
    lines.push(`- [${name}](/${enc(d)}/)`);
  }
  for (const k of files) {
    const name = prettyName(path.posix.basename(k));
    // root-relative md path so rewriteHref resolves it to the page
    lines.push(`- [${name}](/${enc(k)}.md)`);
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// build
// ---------------------------------------------------------------------------

const template = fs.readFileSync(path.join(SELF, "src/template.html"), "utf8");
const inlineJs = fs.readFileSync(path.join(SELF, "src/site.js"), "utf8");

async function buildPage(key) {
  const isDirIndex = !allKeys.has(key); // synthesised dir listing page
  const dir = isDirIndex ? key : null;

  let source, ctx;
  if (isDirIndex) {
    // Generate content: a heading with the directory's pages.
    source = `# ${prettyName(path.posix.basename(key))}\n\n${dirListing(dir, { key })}`;
    ctx = { key };
  } else {
    const file = path.join(ROOT, key + MD);
    source = fs.readFileSync(file, "utf8");
    ctx = { key };
  }
  const mdSource = unwrapBlockquoteTables(unwrapWikiLinks(source, ctx));

  const parsed = parseMeta(mdSource);
  const title = (parsed.title && parsed.title.replace(/[*_`]/g, "").trim()) || titleFromKey(key);

  // strip the h1 from the body (it is the page title)
  const body = mdSource.replace(/^\s*#\s+.+?(?:\s*#*\s*)?(?=\n|$)/, "");
  const content = makeMd(ctx).render(body);

  const toc = extractToc(content);
  const tocHtml = toc
    .map((h) => {
      const cls = h.level === 2 ? "toc-level-2" : h.level === 3 ? "toc-level-3" : "toc-level-4";
      return `<a href="#${h.id}" class="${cls}">${escapeHtml(h.text)}</a>`;
    })
    .join("\n");

  const html = await format(ejs.render(template, {
    title,
    content,
    hasToc: toc.length > 0,
    toc: tocHtml,
    tree: renderTree(key),
    homeHref: relPageHref(key, HOME_PAGE),
    rawUrl,
    fileName: key + MD,
    rawPageHref: key + MD,
    ghUrl: isDirIndex ? TREE_GH + encUrl(key) : blobUrl(key + MD),
    isDirIndex,
    activeKey: key,
    escapeHtml,
    inlineJs,
  }), { parser: "html", ...prettierOptions });

  const outPath = path.join(DIST, pageFile(key));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  return key;
}

async function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });
  const n = (await Promise.all(buildKeys.map(buildPage))).length;
  console.log(`Built ${n} pages into ${path.relative(SELF, DIST)}`);
  return n;
}

// ---------------------------------------------------------------------------
// watch
// ---------------------------------------------------------------------------

function watch() {
  let timer = null;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      build()
        .then(() => console.log(`Rebuilt at ${new Date().toLocaleTimeString()}`))
        .catch((err) => console.error(err));
    }, 150);
  };
  fs.watch(ROOT, { recursive: true }, (ev, fname) => {
    if (!fname || fname.startsWith(".")) return;
    if (/^(?:\.static[/\\])?(?:dist|node_modules)[/\\]/.test(fname)) return;
    if (!/(?:\.md$|\.static\/src\/)/.test(fname)) return;
    rebuild();
  });
  console.log("Watching for changes…");
}

// ---------------------------------------------------------------------------

if (process.argv.includes("--watch")) {
  build().catch((err) => console.error(err));
  watch();
} else {
  build().catch((err) => console.error(err));
}