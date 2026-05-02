#!/usr/bin/env node

const args = process.argv.slice(2);
const getArg = (name, fallback = undefined) => {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 ? args[idx + 1] : fallback;
};

const days = Number(getArg("days", "30"));
const keywords = getArg("keywords", "직제,정원,조직개편,입법예고")
  .split(",")
  .map((x) => x.trim())
  .filter(Boolean);

const sources = [
  {
    name: "ai-readable-gazette-kr",
    url: "https://github.com/hosungseo/ai-readable-gazette-kr",
    use: "관보 Markdown 코퍼스에서 키워드 검색",
    auth: "none",
  },
  {
    name: "gov-gazette-md",
    url: "https://github.com/hosungseo/gov-gazette-md",
    use: "관보 metadata/cache/extraction 파이프라인과 readable layer 확인",
    auth: "none",
  },
  {
    name: "kgov-ready-demo asset catalog",
    url: "https://kgov-ready-demo.vercel.app/api/repos",
    use: "에이전트가 관보/보도자료 코퍼스 자산을 발견하는 환경광장 API",
    auth: "none",
  },
];

const output = {
  status: "ready-without-key",
  skill: "official-gazette-search",
  task: "관보에서 직제·정원 관련 문서 후보 찾기",
  window: `최근 ${days}일`,
  keywords,
  sources,
  suggestedAgentPrompt: `최근 ${days}일 관보에서 ${keywords.join(", ")} 관련 문서를 찾아줘. 문서명, 게재일, 기관명, 문서유형, 원문/readable 링크, 직제·정원 검토 쟁점을 표로 정리해줘. 중요 인용은 원문 PDF 대조 필요 여부를 표시해줘.`,
  expectedPacket: [
    "검색 조건",
    "확인한 코퍼스/출처",
    "문서 후보 목록",
    "기관·게재일·문서유형",
    "관련 키워드 매칭 근거",
    "직제·정원 검토 쟁점",
    "원문 대조 필요 지점",
  ],
  safety: [
    "관보 PDF 추출 텍스트는 오탈자 가능성이 있으므로 중요 인용은 원문 PDF와 대조합니다.",
    "게재일, 문서번호, 기관명을 반드시 남깁니다.",
    "직제·정원 관련 판단은 최종 검토자가 확인합니다.",
  ],
};

console.log(JSON.stringify(output, null, 2));
