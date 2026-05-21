# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Local dev server with live reload
bundle exec jekyll serve --livereload

# Build only
bundle exec jekyll build

# Create a new blog post
bundle exec jekyll post "My New Post"

# Docker alternative (no Ruby install required)
docker run \
  --volume="$PWD:/srv/jekyll" \
  -p 4000:4000 -p 35729:35729 \
  -it jekyll/jekyll \
  jekyll serve --livereload
```

## Architecture

This is a Jekyll static site deployed to GitHub Pages. Pushes to `master` trigger an automatic build and deploy via GitHub Actions (`.github/workflows/build.yml`).

**Content structure:**
- `_posts/` — Blog posts in Markdown with YAML front matter; filenames must follow `YYYY-MM-DD-title.md`
- `_publications/` — Publication entries as a Jekyll collection (no output pages generated); referenced by `publications.md`
- `_data/` — YAML data files used to drive dynamic content (e.g., projects list)
- `_layouts/` — Page templates: `default`, `post`, `publication`, `cv`
- `_includes/` — Reusable HTML partials (header, footer, etc.)
- `_sass/` — SCSS source; compiled and compressed in production
- `_site/` — Generated build output; never edit directly

**Key pages:**
- `index.md` — Home page
- `cv.html` — CV page driven by structured data
- `publications.md` — Renders entries from `_publications/`
- `projects.md` — Renders entries from `_data/`

**Plugins (GitHub Pages compatible):** `jekyll-sitemap`, `jekyll-feed`, `jekyll-seo-tag`, `jekyll-mentions`

## Adding Content

**New publication:** add a Markdown file to `_publications/` with appropriate front matter (title, authors, venue, year, url, etc.).

**New blog post:** use `bundle exec jekyll post "Title"` or create `_posts/YYYY-MM-DD-title.md` manually.

**New project:** add an entry to the relevant YAML file in `_data/`.
