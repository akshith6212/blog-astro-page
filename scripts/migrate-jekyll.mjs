#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Convert Jekyll posts (YYYY-MM-DD-slug.md with YAML frontmatter) into
 * AstroPaper posts.
 *
 * Usage: node scripts/migrate-jekyll.mjs <path-to-jekyll/_posts> [out-dir]
 *
 * - pubDatetime comes from the filename date (IST), unless frontmatter has `date`.
 * - description comes from frontmatter `description`/`excerpt`, else the first paragraph.
 * - tags/categories become `tags`. Unknown frontmatter keys are dropped.
 * - The post body is copied unchanged. Review images and Liquid tags by hand.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const [src, out = "src/content/posts"] = process.argv.slice(2);
if (!src) {
  console.error("Usage: node scripts/migrate-jekyll.mjs <_posts dir> [out-dir]");
  process.exit(1);
}
mkdirSync(out, { recursive: true });

const unquote = v => v.trim().replace(/^(['"])(.*)\1$/, "$2");

function parseList(raw) {
  const v = raw.trim();
  if (v.startsWith("[")) return v.slice(1, -1).split(",").map(unquote).filter(Boolean);
  return v.split(/\s+/).map(unquote).filter(Boolean);
}

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  const data = {};
  let listKey = null;
  for (const line of m[1].split(/\r?\n/)) {
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && listKey) {
      data[listKey].push(unquote(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    if (value === "") {
      data[key] = [];
      listKey = key;
    } else {
      data[key] = value;
      listKey = null;
    }
  }
  return { data, body: m[2] };
}

const firstParagraph = body =>
  body
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .find(p => p && !/^(#|!\[|```|<|\{%|-|\*|>)/.test(p))
    ?.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, 160)
    .trim() ?? "";

const slugify = s =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const quote = s => JSON.stringify(s);

for (const file of readdirSync(src).filter(f => /\.(md|markdown)$/.test(f))) {
  const name = file.replace(/\.(md|markdown)$/, "");
  const nm = name.match(/^(\d{4}-\d{2}-\d{2})-(.*)$/);
  const { data, body } = parseFrontmatter(readFileSync(join(src, file), "utf8"));

  const date = nm ? nm[1] : String(data.date ?? "").slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    console.warn(`skip ${file}: no date in filename or frontmatter`);
    continue;
  }
  const title = unquote(data.title ?? (nm ? nm[2] : name).replace(/-/g, " "));
  const slug = slugify(nm ? nm[2] : title);
  const tagSource = [data.tags, data.categories, data.tag, data.category].find(
    v => v && v.length
  );
  const tags = tagSource ? (Array.isArray(tagSource) ? tagSource : parseList(tagSource)) : ["others"];
  const description =
    unquote(String(data.description ?? data.excerpt ?? "")) || firstParagraph(body) || title;

  const fm = [
    "---",
    `title: ${quote(title)}`,
    `pubDatetime: ${date}T00:00:00+05:30`,
    `description: ${quote(description)}`,
    `tags: [${tags.map(quote).join(", ")}]`,
    "---",
    "",
  ].join("\n");

  writeFileSync(join(out, `${slug}.md`), fm + body.replace(/^\s+/, ""));
  console.log(`ok   ${file} -> ${slug}.md`);
}
