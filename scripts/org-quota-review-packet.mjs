#!/usr/bin/env node

const args = process.argv.slice(2);
const getArg = (name, fallback = undefined) => {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 ? args[idx + 1] : fallback;
};

const ministry = getArg("ministry", "OO부");
const request = getArg("request", "정원 증원 요구자료 검토");
const output = {
  status: "packet-template-ready",
  skill: "org-quota-review",
  title: `${ministry} ${request} 검토 패킷`,
  auth: {
    required: false,
    optionalEnv: ["LAW_GO_KR_OC", "ASSEMBLY_API_KEY", "DATA_GO_KR_SERVICE_KEY"],
    note: "키가 없어도 로컬 자료와 공개 코퍼스로 초안 패킷을 만들고, 미확인 항목은 사람 검토 필요로 표시합니다."
  },
  packet: {
    requestSummary: {
      ministry,
      request,
      requestedChange: "TODO: 요구 기구/정원 변화량 입력",
      deadline: "TODO",
      sourceFiles: []
    },
    evidencePlan: [
      { area: "법령", source: "정부조직법/직제/시행규칙", env: "LAW_GO_KR_OC optional", output: "조문 근거표" },
      { area: "관보", source: "ai-readable-gazette-kr / gov-gazette-md", env: "none", output: "유사 직제·정원 고시 후보" },
      { area: "공공데이터", source: "data.go.kr", env: "DATA_GO_KR_SERVICE_KEY optional", output: "업무량·대상자·수요 지표 후보" },
      { area: "국회", source: "열린국회/회의록/의안", env: "ASSEMBLY_API_KEY optional", output: "질의·쟁점·리스크 후보" }
    ],
    issueTableTemplate: [
      { issue: "법령상 설치/위임 근거", check: "현행 조문과 직제 근거 확인", status: "needs-review" },
      { issue: "기능 중복 가능성", check: "기존 부서/타 부처 기능과 중복 여부", status: "needs-review" },
      { issue: "업무량 근거", check: "민원·사업량·대상자·재정 규모 지표", status: "needs-data" },
      { issue: "정원 산정 논리", check: "증원 규모와 산식/전례 비교", status: "needs-review" },
      { issue: "국회·언론 리스크", check: "예상 질문과 반대 논리", status: "needs-review" }
    ],
    deliverables: [
      "1쪽 검토요약",
      "근거자료 목록",
      "쟁점표",
      "보완요구 후보",
      "반대검토",
      "검토의견 초안"
    ]
  },
  suggestedAgentPrompt: `${ministry}의 ${request}를 org-quota-review 방식으로 검토 패킷화해줘. 요청 요약, 법령·관보·공공데이터·국회자료 확인 계획, 쟁점표, 보완요구 후보, 반대검토, 검토의견 초안을 나눠줘. 키나 원문이 없어 확인하지 못한 항목은 사람 검토 필요로 표시해줘.`,
  safety: [
    "최종 정원 판단과 대외 회신은 사람 검토가 필요합니다.",
    "비공개 요구자료는 외부 업로드하지 않습니다.",
    "숫자와 법령 인용에는 출처와 기준일을 남깁니다."
  ]
};

console.log(JSON.stringify(output, null, 2));
