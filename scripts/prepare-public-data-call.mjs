#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const getArg = (name, fallback = undefined) => {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 ? args[idx + 1] : fallback;
};
const mask = (value) => value ? "${" + value + "}" : "";

const apiId = getArg("api", "mois-resident-population");
const dir = path.resolve("skills/public-data-portal/apis");
const apis = fs.readdirSync(dir).filter((n) => n.endsWith(".json")).map((n) => JSON.parse(fs.readFileSync(path.join(dir, n), "utf8")));
const api = apis.find((x) => x.id === apiId || x.title.includes(apiId));

if (!api) {
  console.log(JSON.stringify({
    status: "api-not-found",
    requested: apiId,
    available: apis.map((x) => ({ id: x.id, title: x.title, provider: x.provider }))
  }, null, 2));
  process.exit(0);
}

const envName = api.env;
const key = envName ? process.env[envName] : "";
const missingKey = api.auth === "user-key-required" && !key;
let requestUrl = api.endpoint;
const params = { ...(api.defaultParams || {}) };

if (Object.keys(params).length) {
  const url = new URL(api.endpoint);
  for (const [k, v] of Object.entries(params)) {
    const actual = typeof v === "string" && envName && v.includes(`\${${envName}}`) ? (key || `\${${envName}}`) : v;
    url.searchParams.set(k, actual);
  }
  requestUrl = url.toString();
}

console.log(JSON.stringify({
  status: missingKey ? "needs-user-key" : "ready",
  api: {
    id: api.id,
    title: api.title,
    provider: api.provider,
    auth: api.auth,
    requiredEnv: envName || null
  },
  apply: missingKey ? {
    portalSearch: api.portalSearch,
    steps: [
      "공식 포털에서 API 검색",
      "활용신청 후 key 발급",
      `${envName} 환경변수에 key 저장`,
      `다시 node scripts/prepare-public-data-call.mjs --api ${api.id} 실행`
    ]
  } : null,
  request: {
    method: api.method || "GET",
    url: envName ? requestUrl.replace(key, mask(envName)) : requestUrl,
    params
  },
  outputs: api.outputs || [],
  fallback: api.fallback,
  safety: api.safety || []
}, null, 2));
