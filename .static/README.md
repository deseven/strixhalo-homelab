# Static SH wiki generator
Builds a fully static, interlinked set of HTML pages from the wiki markdown
in the repo root. Output goes to `.static/dist`.

## Usage
```sh
cp .env.example .env # and edit it
cd .static
npm install          # first time
npm run build        # -> dist/
```

## What gets generated
- One `.html` page per `.md` wiki page, mirroring the repo layout
  (`Guides/Buyer's_Guide.md` -> `dist/Guides/Buyer's_Guide.html`).
- `dist/index.html` is the home page (built from the root `README.md`);
  with `CLEAN_URLS=true` it is linked as the wiki root (`../`, …), otherwise
  as `index.html`.

## Serving clean URLs
With `CLEAN_URLS=true` the pages are still emitted as `key.html`; only the
*links* lose the `.html` suffix. The webserver therefore needs a rule that
maps an extension-less path onto the real `.html` file. Example nginx config
(serve `dist/` as the site root):

```nginx
server {
    listen 80;
    server_name wiki.example.com;
    root /var/www/wiki;   # <- the build output (dist/)

    location / {
        # `$uri` for real files, `$uri/` for directories (index.html),
        # `$uri.html` for the extension-less page links.
        try_files $uri $uri/ $uri.html =404;
    }
}
```

## Link rewriting
| Source link | Generated |
| ----------- | --------- |
| `./img.png` (attachment relative) | `https://raw.githubusercontent.com/{GH_REPO}/repo/path/to/img.png` |
| `../Other_Page.md` | relative `.html` link (or extension-less with `CLEAN_URLS=true`) |
| `https://…` | unchanged |
| `#anchor` | unchanged |
| `../Some/Dir/` | relative dir link (trailing `/`) |
| `[[alias\|Target]]` (OtterWiki) | `[alias](relative .html)` |

`?thumbnail` query strings (OtterWiki thumbnails) are respected via applied styling.

All attachments (images, PDFs, firmware ROMs, …) are linked as raw GitHub
copies of the configured repo. The raw URL base is derived from `GH_REPO` as
`https://raw.githubusercontent.com/{GH_REPO}/` (`HEAD` is substituted when no
branch is given, resolving to the default branch); "View on GitHub" links
use `https://github.com/{user}/{repo}/blob/{branch-or-HEAD}/`. Raw `.md`
files referenced in the wiki (e.g. via `[[...]]` or plain links ending in
`.md` that point to pages outside the wiki page set) also resolve under the
raw base.