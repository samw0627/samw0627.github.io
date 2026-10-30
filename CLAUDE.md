# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Package manager is **pnpm** (CI uses pnpm 9, Node 20).

```bash
pnpm dev      # Next.js dev server (http://localhost:3000)
pnpm build    # Static export to ./out (this is what CI deploys)
pnpm lint     # ESLint (eslint-config-next)
```

There is no test suite. `pnpm build` is the real check: it runs type-checking and every `generateStaticParams`, so a broken content file or missing data file fails the build.

## Architecture

This is a personal academic site built with **Next.js 16 (App Router) + React 19 + Tailwind CSS v4**. It is exported as a fully static site (`output: "export"`, `trailingSlash: true`, unoptimized images in `next.config.ts`) and deployed to GitHub Pages by `.github/workflows/build.yml` on every push to `master`, which uploads `./out`.

**Legacy Jekyll layout:** the site was migrated from Jekyll. `_config.yml`, `Gemfile`, `_layouts/`, `_includes/`, `_sass/`, `_site/`, the root `*.md`/`cv.html` pages, and the README's `jekyll` commands are leftovers and are **not used by the build**. However, the Next.js app still reads content from the Jekyll-style folders, so those folders are the source of truth for content.

**Data flow:** Server components in `app/` call loader functions in `lib/`. The loaders read files from disk with `fs` at build time (paths relative to `process.cwd()`). Nothing is fetched at runtime.

| Loader | Source | Notes |
|---|---|---|
| `lib/posts.ts` | `_posts/YYYY-MM-DD-slug.(md\|markdown)` | Date and slug come from the filename; routed at `/blog/[year]/[month]/[slug]` |
| `lib/publications.ts` | `_publications/*.html` | Front matter is parsed with gray-matter; the body is rendered as the description. Front-matter keys are snake_case (`venue_location`, `venue_url`), mapped to camelCase in `Publication`. `highlight: true` puts it on the home page |
| `lib/projects.ts` | `_data/projects.yml` | Project list; a numeric `highlight` sets the order on the home page |
| `lib/project-content.ts` | `content/projects/<slug>.md` | Long-form case-study pages at `/projects/[slug]`. Front matter defines `sections` (id/label/roman numeral, which drive `ProjectSideNav`) and optional `findings` |
| `lib/papers.ts` | `content/papers/<slug>.mdx` | Interactive paper summaries at `/papers/[slug]`. The `publication:` field links to a `_publications/` entry, which supplies title, authors, venue and links. `lib/paper-index.ts` maps publications to their paper pages (kept separate to avoid a circular import), so `PublicationCard` shows a "Project page" chip |
| `lib/data.ts` | `_data/*.yml` | CV data (people, positions, education, awards, news, service, teaching, etc.) and talks. Missing or fully commented-out files load as `[]` |

Shared types are in `lib/types.ts`. Markdown is rendered with remark + remark-gfm + remark-html with `sanitize: false`, so raw HTML in content is passed through. The `@/*` import alias maps to the repo root.

**Static assets:** only `public/` is served (`public/images`, `public/papers`). The top-level `images/` and `papers/` folders are Jekyll leftovers, so new assets go in `public/`.

**Styling and theming:** Tailwind v4 is configured CSS-first in `app/globals.css` (`@theme` tokens, no `tailwind.config`). Dark mode uses a `[data-theme="dark"]` attribute on `<html>`. An inline script in `app/layout.tsx` sets it before hydration from `localStorage.theme` or `prefers-color-scheme`, and `components/ThemeToggle.tsx` flips it. Use the color tokens (`--color-bg`, `--color-text-primary`, `--color-accent`, …) instead of hard-coded colors so both themes keep working. The Adaline-named tokens (`--color-canvas-ice`, `--color-valley-green`, …) are aliases that are redefined for dark mode as well. `design.md` is the reference style guide that the visual design was based on. Fonts are DM Sans and Fragment Mono via `next/font`.

## Adding Content

- **Blog post:** `_posts/YYYY-MM-DD-title.md` with a `title` in the front matter.
- **Publication:** `_publications/<year>-<slug>.html` with YAML front matter (`title`, `authors`, `year`, `venue`, `type`, links such as `pdf`/`doi`/`arxiv`, and optional `highlight: true`).
- **Project card:** add an entry to `_data/projects.yml`. For a full case-study page, also add `content/projects/<slug>.md` (front matter matches `RichProject` in `lib/project-content.ts`). Until one exists, `/projects/[slug]` builds a `_none` placeholder because static export rejects empty `generateStaticParams`. To link a card to a paper page instead, set `page: /papers/<slug>/`. An `image` starting with `/` is used as-is; otherwise it's relative to `public/images/projects/`.
- **Paper page:** copy `content/papers/_template.mdx` to `content/papers/<slug>.mdx` (files starting with `_` are skipped) and put figures in `public/images/papers/<slug>/` as WebP, about 1800px wide. The MDX is rendered by `next-mdx-remote/rsc`, which blocks JS expressions, so component props must be strings (`value="0.96"`, not `value={0.96}`). The available components are registered in `components/paper/mdx-components.tsx`: `Figure`, `Term`, `Deeper`, `Stats`/`Stat`, `Quote`, `Tabs`/`Tab`, `Bars`/`Bar` and `Video`. Most of them render on the server. Only `Tabs`, `FigureLightbox` and `CopyButton` are client components, and the lightbox finds figures through their `data-figure` attribute. Their styles are in `components/paper/paper.css`.
- **CV data:** edit the matching YAML file in `_data/`.
