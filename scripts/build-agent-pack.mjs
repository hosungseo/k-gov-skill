#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
function listSkillManifests() {
  return fs.readdirSync("skills").sort().flatMap((dir) => {
    const file = path.join("skills", dir, "skill.json");
    return fs.existsSync(file) ? [readJson(file)] : [];
  });
}
function listPublicDataApis() {
  const dir = "skills/public-data-portal/apis";
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((n) => n.endsWith(".json")).sort().map((n) => readJson(path.join(dir, n)));
}
function listExamples() {
  const file = "examples/index.json";
  return fs.existsSync(file) ? readJson(file).examples || [] : [];
}

const pack = {
  name: "k-gov-skill agent pack",
  repository: "https://github.com/hosungseo/k-gov-skill",
  language: "ko",
  purpose: "한국 공무원 행정업무를 AI 에이전트가 스킬·레시피·API manifest 기반으로 처리하도록 돕는 agent-facing bundle",
  entrypoints: {
    human: "README.md",
    llm: "llms.txt",
    auth: "docs/auth-model.md",
    prompts: "docs/prompt-pack.md",
    status: "STATUS.md",
    roadmap: "ROADMAP.md"
  },
  rules: [
    "공공 API key가 필요하면 사용자가 직접 신청한다.",
    "키가 없으면 실패 대신 신청 안내와 fallback을 제공한다.",
    "공식 출처·기준일·원문 URL을 보존한다.",
    "개인정보·민감정보·처분 판단·외부 발송은 사람 검토를 요구한다.",
    "비공개 HWP/HWPX 문서는 외부 업로드 없이 로컬 처리한다."
  ],
  skills: listSkillManifests(),
  examples: listExamples(),
  publicDataApis: listPublicDataApis(),
  generatedAt: new Date().toISOString()
};

console.log(JSON.stringify(pack, null, 2));
