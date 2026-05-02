#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const scripts = packageJson.scripts || {};
const examples = [];
for (const dir of fs.readdirSync("examples").sort()) {
  const full = path.join("examples", dir);
  if (!fs.statSync(full).isDirectory()) continue;
  const readme = path.join(full, "README.md");
  const text = fs.existsSync(readme) ? fs.readFileSync(readme, "utf8") : "";
  const title = text.match(/^#\s+(.+)$/m)?.[1] || dir;
  const command = Object.entries(scripts).find(([name, cmd]) => name.startsWith("example:") && cmd.includes(dir.replace(/-/g, "-")))?.[0];
  examples.push({
    id: dir,
    title,
    readme,
    command: command ? `npm run ${command}` : inferCommand(dir, scripts),
    purpose: firstParagraph(text)
  });
}
console.log(JSON.stringify({ count: examples.length, examples }, null, 2));

function firstParagraph(text) {
  return text.split(/\n\n+/).slice(1).find((p) => p.trim() && !p.trim().startsWith("```"))?.replace(/\s+/g, " ").trim() || "";
}
function inferCommand(dir, scripts) {
  const map = {
    "public-data-first-call": "example:public-data",
    "gazette-jikje-watch": "example:gazette",
    "org-quota-review-packet": "example:org-quota",
    "hwp-document-packet": "example:hwp",
    "korean-law-citation-packet": "example:law",
    "prepare-public-data-call": "example:prepare-api"
  };
  return map[dir] && scripts[map[dir]] ? `npm run ${map[dir]}` : null;
}
