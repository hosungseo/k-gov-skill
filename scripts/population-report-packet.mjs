#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const getArg = (name, fallback = undefined) => {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 ? args[idx + 1] : fallback;
};
const has = (name) => args.includes(`--${name}`);

const region = getArg("region", "전국");
const period = getArg("period", "최근 12개월");
const numOfRows = getArg("numOfRows", "100");
const format = getArg("format", "markdown");
const live = has("live");
const apiId = "mois-resident-population";
const manifest = JSON.parse(fs.readFileSync(path.join("skills/public-data-portal/apis/population.json"), "utf8"));
const key = process.env[manifest.env] || "";

const sampleRows = [
  { period: "2025-01", region, population: 51321000, households: 23980000, note: "sample" },
  { period: "2025-06", region, population: 51274000, households: 24095000, note: "sample" },
  { period: "2025-12", region, population: 51218000, households: 24210000, note: "sample" }
];

function makeUrl({ maskKey = false } = {}) {
  const url = new URL(manifest.endpoint);
  for (const [k, v] of Object.entries(manifest.defaultParams || {})) {
    url.searchParams.set(k, String(v).replace(`\${${manifest.env}}`, key || `\${${manifest.env}}`));
  }
  url.searchParams.set("numOfRows", numOfRows);
  return maskKey ? url.toString().replace(key, `\${${manifest.env}}`) : url.toString();
}

function packet(rows, sourceStatus) {
  const first = rows[0];
  const last = rows[rows.length - 1];
  const delta = last.population - first.population;
  return {
    status: sourceStatus,
    title: `${region} 주민등록 인구 업무보고 패킷`,
    source: {
      apiId,
      provider: manifest.provider,
      title: manifest.title,
      auth: manifest.auth,
      requiredEnv: manifest.env,
      requestUrl: makeUrl({ maskKey: true }),
      liveRequested: live
    },
    query: { region, period, numOfRows },
    summary: {
      headline: `${region} 주민등록 인구는 샘플 기준 ${first.period} ${first.population.toLocaleString()}명에서 ${last.period} ${last.population.toLocaleString()}명으로 ${delta.toLocaleString()}명 변동했습니다.`,
      populationDelta: delta,
      householdDelta: last.households - first.households,
      interpretation: delta < 0 ? "감소 추세로 보이며, 세대수 변화와 함께 원인 확인이 필요합니다." : "증가 또는 보합 추세로 보이며, 세대수 변화와 함께 추가 확인이 필요합니다."
    },
    markdown: toMarkdown(rows, delta),
    rows,
    nextChecks: [
      "실제 serviceKey로 최신 원자료를 재호출합니다.",
      "행정구역 코드/기준월/집계 단위를 확인합니다.",
      "세대수, 고령인구, 전입전출 등 보조지표를 붙입니다.",
      "보고서에 제공기관, 기준일, 호출 URL을 남깁니다."
    ],
    humanReview: [
      "정책적 원인 해석",
      "타 통계와의 불일치 설명",
      "대외 보고용 문구 확정"
    ]
  };
}

function normalizePopulationRows(payload) {
  const raw = payload?.admmPpltnStats || payload?.response?.body?.items?.item || payload?.items || [];
  const items = Array.isArray(raw) ? raw : [raw].filter(Boolean);
  return items.map((item) => {
    const name = item.ctpvNm || item.sidoNm || item.admmNm || item.region || item.행정구역 || item.name || region;
    const periodValue = item.statsYm || item.baseYm || item.crtrYm || item.기준연월 || item.period || "unknown";
    const populationValue = item.totNmpr || item.population || item.인구수 || item.totPopltn || item.populationCount || 0;
    const householdValue = item.hhCnt || item.households || item.세대수 || item.householdCount || 0;
    return {
      period: String(periodValue),
      region: String(name),
      population: Number(String(populationValue).replace(/,/g, "")) || 0,
      households: Number(String(householdValue).replace(/,/g, "")) || 0,
      note: "live"
    };
  }).filter((row) => row.population > 0);
}

async function fetchLiveRows() {
  const response = await fetch(makeUrl(), { headers: { "user-agent": "k-gov-skill/0.1" } });
  const text = await response.text();
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error(`Expected JSON response but got: ${text.slice(0, 200)}`);
  }
  const rows = normalizePopulationRows(payload);
  if (!rows.length) throw new Error("Live response parsed, but no population rows were found. Check API schema/params.");
  return rows;
}

function toMarkdown(rows, delta) {
  const first = rows[0];
  const last = rows[rows.length - 1];
  return `# ${region} 주민등록 인구 업무보고 패킷\n\n## 요약\n\n${region} 주민등록 인구는 ${first.period} ${first.population.toLocaleString()}명에서 ${last.period} ${last.population.toLocaleString()}명으로 ${delta.toLocaleString()}명 변동했습니다. 이 결과는 ${manifest.provider} ${manifest.title} API를 기준으로 확인해야 하며, 현재 출력은 키가 없을 경우 샘플 구조를 보여주는 용도입니다.\n\n## 원자료\n\n- API: ${manifest.title}\n- 제공기관: ${manifest.provider}\n- 필요 환경변수: ${manifest.env}\n- 호출 준비: \`node scripts/prepare-public-data-call.mjs --api ${apiId}\`\n\n## 표\n\n| 기간 | 지역 | 인구 | 세대수 | 비고 |\n|---|---|---:|---:|---|\n${rows.map((r) => `| ${r.period} | ${r.region} | ${r.population.toLocaleString()} | ${r.households.toLocaleString()} | ${r.note} |`).join("\n")}\n\n## 다음 확인\n\n1. 실제 serviceKey로 최신 원자료를 재호출합니다.\n2. 행정구역 코드와 기준월을 확인합니다.\n3. 세대수, 고령인구, 전입전출 등 보조지표를 붙입니다.\n4. 정책 해석과 대외 문구는 사람 검토 후 확정합니다.\n`;
}

if (live && !key) {
  console.log(JSON.stringify({
    status: "needs-user-key",
    reason: `${manifest.env} is required for live call`,
    fallbackPacket: packet(sampleRows, "sample-fallback"),
    apply: {
      portalSearch: manifest.portalSearch,
      commandAfterKey: `${manifest.env}=... node scripts/population-report-packet.mjs --live --region ${region}`
    }
  }, null, 2));
  process.exit(0);
}

let rows = sampleRows;
let status = "sample-fallback";
if (live) {
  try {
    rows = await fetchLiveRows();
    status = "live";
  } catch (error) {
    console.error(JSON.stringify({ status: "live-fetch-failed", message: error.message, fallback: "sample packet emitted" }, null, 2));
    status = "live-fetch-failed-sample-fallback";
  }
}
const result = packet(rows, status);
if (format === "md" || format === "markdown") console.log(result.markdown);
else console.log(JSON.stringify(result, null, 2));
