# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working
with code in this repository.

## Commands

```sh
npm ci          # install dependencies
npm run dev     # start dev server (http://localhost:4321)
npm run build   # production build
npm run format  # run prettier on all files
```

There are no automated tests. Verify changes by running `npm run build`
and checking for errors.

## Architecture

This is an **Astro** static site for _Mercenari del Labirinto_, an Italian
historical archery re-enactment association. It is deployed on **Cloudflare
Pages** via a build trigger (`.github/workflows/build.yml` pings a
Cloudflare webhook on a weekly cron and on demand).

### Content

Blog posts live in `src/content/blog/<year>/` as `.md` or `.mdx` files.
The collection schema is defined in `src/content.config.ts` — required
frontmatter fields are `title`, `description`, and `pubDate`.
Optional: `heroImage`, `updatedDate`, `author`, `lang` (`"it"` default or `"en"`).

Hero images should live in `src/assets/<year>/<slug>/` (older posts may vary), referenced with a relative
path from the post file.

### Pages

- `src/pages/index.astro` — home page with contact info and links
- `src/pages/calendar.astro` — fetches a public Google Calendar iCal feed
  at build time via `node-ical`, filters past events, and renders upcoming
  ones; throws if the feed is empty or unreachable (so builds fail loudly
  rather than publish empty content)
- `src/pages/rss.xml.js` — RSS feed of blog posts
- `src/pages/*.md` — static markdown pages (`chi-siamo`, `statuto`)
  rendered with `defaultPage` layout

### Layouts and components

- `src/layouts/BlogPost.astro` — wraps blog post content with `BaseHead`,
  `Header`, `Footer`, and hero image
- `src/layouts/defaultPage.astro` — minimal layout for static `.md` pages
- `src/consts.ts` — site-wide constants (`SITE_TITLE`, `SITE_DESCRIPTION`,
  etc.)

### Formatting and pre-commit

Prettier is enforced via pre-commit hooks (`.pre-commit-config.yaml`). The
hook runs `npm run format` on every commit. Images committed as JPEG or PNG
are automatically optimized by `jpegoptim`/`optipng` (must be installed
locally).

## Blog post structure

Posts can be `.md` or `.mdx` (use `.mdx` when you need imports/components). Include a `heroImage`
when available; preferred location is `src/assets/<year>/<slug>/hero.<ext>`.
Reference it from the frontmatter with a relative path:

```mdx
---
title: "Post title"
description: "One-sentence summary shown in RSS and SEO meta."
pubDate: "Jul 04 2026"
heroImage: "../../../assets/2026/<slug>/hero.png"
author: Author Name
---
```

For posts with additional inline images, use an `.mdx` file, import them at the top of the file
(after the frontmatter), and render with the Astro `<Image>` component:

```mdx
import { Image } from "astro:assets";
import photo from "../../../assets/2026/<slug>/photo.jpg";

<Image
  src={photo}
  alt="Descriptive alt text"
  width={400}
  style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}
/>
```

Prose text must wrap at 80 columns. Content is written in Italian unless
`lang: en` is set in the frontmatter.
