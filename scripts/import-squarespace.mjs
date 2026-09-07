import fs from "node:fs";
import path from "node:path";

const xmlPath = path.resolve(
  "Squarespace-Wordpress-Export-09-07-2026.xml"
);

const outputDir = path.resolve("src/data");

const xml = fs.readFileSync(xmlPath, "utf8");

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getTag(block, tag) {
  const match = block.match(
    new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`)
  );

  return match ? match[1].trim() : "";
}

function getImageUrls(html) {
  return [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) =>
    decodeEntities(match[1]).replace(/^http:/, "https:")
  );
}

const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(
  (match) => match[1]
);

const pages = items
  .map((item) => {
    const postType = getTag(item, "wp:post_type");

    if (postType !== "page") return null;

    const title = decodeEntities(getTag(item, "title"));
    const slug = getTag(item, "wp:post_name");
    const content = getTag(item, "content:encoded");

    return {
      title,
      slug,
      images: getImageUrls(content),
      html: content,
    };
  })
  .filter(Boolean);

fs.mkdirSync(outputDir, { recursive: true });

for (const page of pages) {
  const filename = `${page.slug || "untitled"}.json`;

  fs.writeFileSync(
    path.join(outputDir, filename),
    JSON.stringify(page, null, 2)
  );
}

console.log(`Imported ${pages.length} Squarespace pages.`);
console.log(`Output written to ${outputDir}`);