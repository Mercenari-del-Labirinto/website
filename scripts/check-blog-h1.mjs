// BlogPost.astro already renders the frontmatter title as an <h1>, so a
// level-1 heading in the post body creates a duplicate H1 on the page.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = "src/content/blog";

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = walk(root).filter((f) => /\.(md|mdx)$/.test(f));
let failed = false;

for (const file of files) {
  const content = readFileSync(file, "utf8");
  const frontmatterEnd = content.startsWith("---")
    ? content.indexOf("\n---", 3)
    : -1;
  const body =
    frontmatterEnd === -1 ? content : content.slice(frontmatterEnd + 4);

  let inCodeFence = false;
  body.split("\n").forEach((line, i) => {
    if (/^```/.test(line)) inCodeFence = !inCodeFence;
    if (!inCodeFence && /^#\s+/.test(line)) {
      console.error(
        `${file}:${i + 1}: level-1 heading in body duplicates the page title. Use ## or lower.`,
      );
      failed = true;
    }
  });
}

if (failed) process.exit(1);
