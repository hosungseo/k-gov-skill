#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const required = [
  "## 목적",
  "## 사용자 신청/로그인",
  "## 필요한 환경변수",
  "## 사용 예시 프롬프트",
  "## 예상 산출물",
  "## 키 없을 때 fallback",
  "## 주의",
];

const root = path.resolve("skills");
const failures = [];
for (const name of fs.readdirSync(root).sort()) {
  const readme = path.join(root, name, "README.md");
  if (!fs.existsSync(readme)) continue;
  const text = fs.readFileSync(readme, "utf8");
  const missing = required.filter((section) => !text.includes(section));
  if (missing.length) failures.push({ skill: name, missing });
}

if (failures.length) {
  console.error(JSON.stringify({ status: "failed", failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ status: "ok", checked: fs.readdirSync(root).filter((name) => fs.existsSync(path.join(root, name, "README.md"))).length }, null, 2));
