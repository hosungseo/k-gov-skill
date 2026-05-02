#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("skills");
const rows = [];
for (const name of fs.readdirSync(root).sort()) {
  const readme = path.join(root, name, "README.md");
  if (!fs.existsSync(readme)) continue;
  const text = fs.readFileSync(readme, "utf8");
  const purpose = (text.match(/## 목적\n\n([\s\S]*?)(\n##|$)/)?.[1] || text.split("\n").slice(2, 4).join(" ")).replace(/\s+/g, " ").trim();
  const auth = (text.match(/## 사용자 신청\/로그인\n\n([\s\S]*?)(\n##|$)/)?.[1] || "").split("\n").map(x => x.trim()).filter(Boolean)[0] || "TODO";
  const envBlock = text.match(/```bash\n([\s\S]*?)```/)?.[1] || "";
  const env = [...envBlock.matchAll(/^([A-Z0-9_]+)=/gm)].map(m => m[1]);
  rows.push({ name, auth, env, purpose });
}
console.log(JSON.stringify({ count: rows.length, skills: rows }, null, 2));
