// site.js - inlined into every generated page (see template.html).
// Works with the Web Awesome (wa-tree/wa-tree-item) sidebar.

(() => {
  "use strict";

  // ---- mobile drawers (pages tree + TOC) ----
  const menuBtn = document.getElementById("menu-btn");
  const tocBtn = document.getElementById("toc-btn");
  const mobileDrawers = Array.from(document.querySelectorAll(".mobile-drawer"));
  function openDrawer(drawer) {
    if (!drawer) return;
    // Only one drawer open at a time.
    mobileDrawers.forEach((d) => d.classList.remove("open"));
    drawer.classList.add("open");
  }
  function closeDrawers() {
    mobileDrawers.forEach((d) => d.classList.remove("open"));
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", () => openDrawer(document.getElementById("mobile-tree")));
  }
  if (tocBtn) {
    tocBtn.addEventListener("click", () => openDrawer(document.getElementById("mobile-toc")));
  }
  // Close on backdrop click or when navigating (any link click).
  mobileDrawers.forEach((drawer) => {
    drawer.addEventListener("click", (e) => {
      if (e.target.closest("[data-close]") || e.target.closest("a")) closeDrawers();
    });
  });

  // ---- tree filter ----
  // Works with Web Awesome wa-tree: hides wa-tree-item elements (via a class,
  // since the shadow DOM may not reflect the hidden attribute), searches the
  // *full path* of every row (pages AND directories), reopens branches that
  // contain matches, and hides empty ones. Recomputes from scratch on every
  // keystroke so removing characters correctly restores matches.
  const search = document.getElementById("tree-search");
  const tree = document.getElementById("tree");
  const applyFilter = () => {
    if (!search || !tree) return;
    const q = search.value.trim().toLowerCase();
    const links = Array.from(tree.querySelectorAll("wa-tree-item > a[data-path]"));
    const items = Array.from(tree.querySelectorAll("wa-tree-item"));
    const matches = new Set();
    if (q) {
      for (const a of links) {
        const path = a.dataset.path.toLowerCase();
        if (path.includes(q)) {
          matches.add(a);
          // Expand every ancestor branch of a match so it's visible.
          let parent = a.closest("wa-tree-item").parentElement?.closest("wa-tree-item");
          while (parent) {
            const pa = parent.querySelector(":scope > a[data-path]");
            if (pa) matches.add(pa);
            parent = parent.parentElement?.closest("wa-tree-item");
          }
        }
      }
    }
    for (const item of items) {
      const link = item.querySelector(":scope > a[data-path]");
      if (link) {
        const matched = q && matches.has(link);
        item.classList.toggle("item-hidden", q && !matched);
        item.classList.toggle("item-link-hidden", q && !matched);
        if (matched && item.matches(":defined")) item.expanded = true;
      } else {
        // A container item without its own link (shouldn't occur, but guard)
        item.classList.toggle(
          "item-hidden",
          q && !links.some((l) => l.dataset.path && l.closest("wa-tree-item") === item)
        );
      }
    }
  };
  if (search && tree) search.addEventListener("input", applyFilter);

  // ---- tree initialization: deep-expand active branch + un-hide ----
  // The <wa-tree> components upgrade asynchronously; while un-upgraded the
  // raw markup is hidden (CSS :not(:defined)) to avoid a text flash. We keep
  // it hidden (via [hidden]) until the components are upgraded AND have
  // rendered, then do two things:
  //
  //  1. Force-expand the active page's ancestor branches, because WA's
  //     tree-item resets a nested item's `expanded` during upgrade (its
  //     parent context is always collapsed at that point), so the `expanded`
  //     attribute on deep branches is lost.
  //  2. Un-hide the tree, and re-apply the filter if the user typed before
  //     the components finished loading.
  //
  // A timeout fallback reveals the raw tree even if Web Awesome never loads
  // (e.g. CDN blocked), so the sidebar is never permanently empty.
  const initTree = (root) => {
    const waTree = root.querySelector("wa-tree");
    if (!waTree) return;
    waTree.hidden = true;

    const activeKey = root.dataset.activeKey;
    const parts = activeKey ? activeKey.split("/") : [];
    const expand = new Set();
    for (let i = 1; i < parts.length; i++) expand.add(parts.slice(0, i).join("/"));

    const run = () => {
      waTree.hidden = false;
      if (!waTree.matches(":defined")) return;
      const items = Array.from(waTree.querySelectorAll("wa-tree-item"));
      Promise.all(items.map((it) => it.updateComplete || Promise.resolve())).then(() => {
        for (const item of items) {
          if (!item.matches(":defined")) continue;
          const link = item.querySelector(":scope > a[data-path]");
          if (link && expand.has(link.dataset.path)) item.expanded = true;
        }
        if (root === tree && search.value) applyFilter();
      });
    };

    Promise.all([
      customElements.whenDefined("wa-tree"),
      customElements.whenDefined("wa-tree-item"),
    ])
      .then(run)
      .catch(() => {});
    // Safety net: if the definitions never arrive, still reveal the tree.
    setTimeout(run, 2000);
  };
  if (tree) initTree(tree);
  const mobileTree = document.getElementById("mobile-tree");
  if (mobileTree) initTree(mobileTree);

  // ---- whole-row click navigation ----
  // Clicking anywhere on a row (except the expand chevron) navigates to that
  // row's page. The component only "selects" the item on row click, so we
  // detect that and follow the anchor instead. Applied to both the desktop
  // sidebar and the mobile drawer tree.
  const wireRowClicks = (root) => {
    const waTree = root.querySelector("wa-tree");
    if (!waTree) return;
    waTree.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.button !== 0) return; // let text/cmd/middle clicks be
      if (e.target.closest("a")) return; // native link click - nothing to do
      if (e.composedPath().some((el) => el?.classList?.contains("expand-button"))) return; // chevron
      const item = e.target.closest("wa-tree-item");
      const link = item && item.querySelector(":scope > a[data-path]");
      if (link) link.click();
    });
  };
  if (tree) wireRowClicks(tree);
  if (mobileTree) wireRowClicks(mobileTree);

  // ---- toc scrollspy ----
  // Handles both the desktop rail (#toc) and the mobile TOC drawer
  // (#toc-mobile); they share the same hrefs so one observer drives both.
  const content = document.getElementById("content");
  const tocRoots = [document.getElementById("toc"), document.getElementById("toc-mobile")].filter(Boolean);
  if (tocRoots.length && content && "IntersectionObserver" in window) {
    const links = tocRoots.flatMap((root) => Array.from(root.querySelectorAll("a[href^='#']")));
    const map = new Map();
    for (const a of links) {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) continue;
      if (!map.has(el)) map.set(el, []);
      map.get(el).push(a);
    }
    const setActive = (el) => {
      // Clear active on both TOCs, then highlight all links for this heading.
      links.forEach((a) => {
        a.classList.remove("toc-active");
        a.classList.add("toc-inactive");
      });
      for (const a of map.get(el) || []) {
        a.classList.add("toc-active");
        a.classList.remove("toc-inactive");
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) setActive(en.target);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    map.forEach((linksForEl, el) => io.observe(el));
  }
})();