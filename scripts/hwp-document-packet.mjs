#!/usr/bin/env node

const args = process.argv.slice(2);
const getArg = (name, fallback = undefined) => {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 ? args[idx + 1] : fallback;
};

const file = getArg("file", "검토자료.hwpx");
const mode = getArg("mode", "review");

const output = {
  status: "local-document-packet-ready",
  skill: "hwp-document-tools",
  file,
  mode,
  auth: {
    required: false,
    note: "HWP/HWPX 처리는 로컬 파일 기준입니다. 비공개 문서는 외부 서비스에 업로드하지 않습니다."
  },
  toolStrategy: [
    { tool: "HWPX ZIP/XML extraction", when: "hwpx 파일의 본문·표 구조를 직접 읽을 때" },
    { tool: "hwp5txt", when: "hwp 5.x 본문 텍스트를 빠르게 추출할 때" },
    { tool: "kordoc", when: "문서 변환과 구조화된 추출을 시도할 때" },
    { tool: "rhwp", when: "레이아웃/IR/round-trip 진단이 필요할 때" }
  ],
  packet: {
    documentProfile: {
      filename: file,
      documentType: file.endsWith(".hwpx") ? "HWPX" : file.endsWith(".hwp") ? "HWP" : "unknown",
      confidentiality: "unknown; user must classify",
      source: "local file"
    },
    extractionPlan: [
      "원문 파일을 복사본으로 보존",
      "텍스트 추출본 생성",
      "표/셀/번호목록 구조 추출",
      "요구사항·근거자료·쟁점 후보 분리",
      "변환 오류/원문 대조 필요 지점 표시"
    ],
    reviewTables: [
      { table: "요구사항", columns: ["항목", "요구 내용", "근거", "누락/불명확" ] },
      { table: "쟁점", columns: ["쟁점", "원문 위치", "검토 의견", "사람 확인" ] },
      { table: "보완요청", columns: ["요청 대상", "보완자료", "이유", "우선순위" ] }
    ],
    deliverables: [
      "원문 구조 보존 Markdown",
      "표 목록",
      "쟁점표",
      "보완요청 후보",
      "검토의견 초안 재료"
    ]
  },
  suggestedAgentPrompt: `${file}을 hwp-document-tools 방식으로 분석해줘. 외부 업로드 없이 로컬에서 처리하고, 원문 구조를 최대한 보존한 Markdown, 표 목록, 요구사항, 쟁점표, 보완요청 후보, 원문 대조 필요 지점을 나눠줘.`,
  safety: [
    "비공개/내부 문서는 외부 서비스에 업로드하지 않습니다.",
    "표 병합과 셀 순서는 추출 오류가 잦으므로 중요 표는 원문 대조가 필요합니다.",
    "변환본은 검토 보조자료이며 원문을 대체하지 않습니다."
  ]
};

console.log(JSON.stringify(output, null, 2));
