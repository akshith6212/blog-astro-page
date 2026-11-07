# Insight Blogger

Personal blog built with [Astro](https://astro.build/) and the [AstroPaper](https://github.com/satnaing/astro-paper) theme (MIT), deployed to GitHub Pages.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm build        # type-check, build, and index search
```

## Writing a post

Add a markdown file to `src/content/posts/`. Required frontmatter: `title`, `pubDatetime`, `description`. Optional: `tags`, `draft`, `featured`, `ogImage`.

```markdown
---
title: "My new post"
pubDatetime: 2026-11-07T22:50:00+05:30
description: "One-line summary"
tags: ["learning"]
---

Body in markdown...
```

Set `draft: true` to keep a post unpublished.

## Migrating old Jekyll posts

```bash
node scripts/migrate-jekyll.mjs <path-to-jekyll/_posts>
```

Then review images and any Liquid tags by hand.

## Deployment

`.github/workflows/deploy.yml` builds on every push to `main` and publishes to GitHub Pages. In the repo settings, set **Pages → Source** to **GitHub Actions**.

For the custom domain, set `SITE_URL` to `https://akshith6212.dev` and delete `BASE_PATH` in the workflow's `env` block.
