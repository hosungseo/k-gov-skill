#!/usr/bin/env node

const args = process.argv.slice(2);
const getArg = (name, fallback = undefined) => {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 ? args[idx + 1] : fallback;
};

const law = getArg("law", "정부조직법");
const article = getArg("article", "제34조");
const hasOc = Boolean(process.env.LAW_GO_KR_OC);

const packet = {
  status: hasOc ? "ready-for-api-check" : "needs-optional-law-api-key-or-manual-check",
  skill: "korean-law-search",
  query: { lawName: law, article },
  auth: {
    required: false,
    optionalEnv: "LAW_GO_KR_OC",
    note: hasOc
      ? "LAW_GO_KR_OC가 있어 API 확인 경로로 진행할 수 있습니다."
      : "LAW_GO_KR_OC가 없으므로 공개 검색/수동 확인 또는 기존 법령 코퍼스 fallback으로 진행합니다."
  },
  citationSchema: "skills/korean-law-search/schemas/citation.schema.json",
  citationPacketTemplate: {
    lawName: law,
    lawId: "TODO",
    article,
    articleTitle: "TODO",
    quote: "TODO: 원문 조문 발췌. 요약문이 아니라 원문을 넣을 것.",
    effectiveDate: "TODO",
    source: "https://www.law.go.kr/ 또는 law.go.kr API URL",
    checkedAt: new Date().toISOString().slice(0, 10),
    confidence: "low",
    needsHumanReview: true,
    notes: [
      "현행 조문 본문 우선",
      "부칙/개정연혁/시행일은 별도 확인",
      "최종 법령 해석은 사람 검토 필요"
    ]
  },
  suggestedAgentPrompt: `${law} ${article}를 korean-law-search 방식으로 확인해줘. 원문 조문을 요약하지 말고 인용 발췌하고, 시행일·원문 URL·확인일·불확실한 부분을 citation packet schema에 맞춰 정리해줘.`,
  safety: [
    "법령 인용은 요약이 아니라 원문 발췌를 우선합니다.",
    "시행일과 현행 여부를 확인합니다.",
    "법률 자문처럼 단정하지 않고 사람 검토 필요 지점을 표시합니다."
  ]
};

console.log(JSON.stringify(packet, null, 2));
