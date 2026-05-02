#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("skills/public-data-portal/apis");
const apis = fs.readdirSync(dir)
  .filter((name) => name.endsWith(".json"))
  .sort()
  .map((name) => JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")));
console.log(JSON.stringify({ count: apis.length, apis }, null, 2));
