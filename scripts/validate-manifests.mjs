#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const required = ["name", "title", "auth", "category", "purpose", "entrypoint", "outputs", "safety"];
const allowedAuth = new Set(["none", "user-key-required", "optional-user-key", "manual-login", "hosted-fallback", "mixed"]);
const failures = [];
for (const dir of fs.readdirSync("skills").sort()) {
  const skillDir = path.join("skills", dir);
  if (!fs.statSync(skillDir).isDirectory()) continue;
  const manifestPath = path.join(skillDir, "skill.json");
  if (!fs.existsSync(manifestPath)) { failures.push({ skill: dir, missingManifest: true }); continue; }
  const data = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const missing = required.filter((key) => data[key] === undefined || data[key] === "" || (Array.isArray(data[key]) && !data[key].length && ["outputs", "safety"].includes(key)));
  if (data.name !== dir) missing.push("name must match directory");
  if (!allowedAuth.has(data.auth)) missing.push("invalid auth");
  if (data.entrypoint && !fs.existsSync(data.entrypoint)) missing.push("entrypoint not found");
  if (missing.length) failures.push({ skill: dir, missing });
}
if (failures.length) { console.error(JSON.stringify({ status: "failed", failures }, null, 2)); process.exit(1); }
console.log(JSON.stringify({ status: "ok", manifests: fs.readdirSync("skills").filter((d)=>fs.existsSync(path.join("skills",d,"skill.json"))).length }, null, 2));
