#!/usr/bin/env node

const args = process.argv.slice(2);
const getArg = (name, fallback = undefined) => {
  const idx = args.indexOf(`--${name}`);
  return idx >= 0 ? args[idx + 1] : fallback;
};
const has = (name) => args.includes(`--${name}`);

const topic = getArg("topic", "population");
const dryRun = has("dry-run");
const key = process.env.DATA_GO_KR_SERVICE_KEY || "";

const CANDIDATES = {
  law:
    null,
  population: {
    title: "행정안전부 주민등록 인구현황",
    provider: "행정안전부",
    portalSearch: "https://www.data.go.kr/tcs/dss/selectDataSetList.do?keyword=%EC%A3%BC%EB%AF%BC%EB%93%B1%EB%A1%9D%20%EC%9D%B8%EA%B5%AC",
    env: "DATA_GO_KR_SERVICE_KEY",
    endpointExample: "https://apis.data.go.kr/1741000/admmPpltnStatsService/getAdmmPpltnStats",
    params: {
      serviceKey: "${DATA_GO_KR_SERVICE_KEY}",
      pageNo: "1",
      numOfRows: "10",
      type: "json"
    },
    fallback: "공공데이터포털에서 API명을 확인하고 활용신청 후 serviceKey를 발급받으세요. 키가 없으면 샘플 형식만 생성합니다."
  },
  schoolLunch: {
    title: "NEIS 학교 급식 식단 정보",
    provider: "교육부/한국교육학술정보원",
    portalSearch: "https://www.data.go.kr/tcs/dss/selectDataSetList.do?keyword=NEIS%20%EA%B8%89%EC%8B%9D%20%EC%8B%9D%EB%8B%A8",
    env: "DATA_GO_KR_SERVICE_KEY",
    endpointExample: "https://open.neis.go.kr/hub/mealServiceDietInfo",
    params: {
      KEY: "${DATA_GO_KR_SERVICE_KEY}",
      Type: "json",
      pIndex: "1",
      pSize: "10",
      ATPT_OFCDC_SC_CODE: "B10",
      SD_SCHUL_CODE: "7010536",
      MLSV_YMD: "20260502"
    },
    fallback: "NEIS OpenAPI에서 교육청 코드와 학교 코드를 확인한 뒤 급식 식단 정보를 호출하세요."
  },
  apartment: {
    title: "국토교통부 아파트 매매 실거래자료",
    provider: "국토교통부",
    portalSearch: "https://www.data.go.kr/tcs/dss/selectDataSetList.do?keyword=%EC%95%84%ED%8C%8C%ED%8A%B8%20%EB%A7%A4%EB%A7%A4%20%EC%8B%A4%EA%B1%B0%EB%9E%98",
    env: "DATA_GO_KR_SERVICE_KEY",
    endpointExample: "https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade",
    params: {
      serviceKey: "${DATA_GO_KR_SERVICE_KEY}",
      LAWD_CD: "11110",
      DEAL_YMD: "202501",
      pageNo: "1",
      numOfRows: "10"
    },
    fallback: "법정동코드와 거래월을 준비한 뒤 활용신청한 serviceKey로 호출하세요."
  }
};

delete CANDIDATES.law;
const candidate = CANDIDATES[topic] || CANDIDATES.population;

function printGuide(reason) {
  const guide = {
    status: "needs-user-key",
    reason,
    topic,
    apiCandidate: candidate.title,
    provider: candidate.provider,
    requiredEnv: candidate.env,
    apply: {
      portalSearch: candidate.portalSearch,
      steps: [
        "공공데이터포털 로그인",
        `검색어로 API 찾기: ${candidate.title}`,
        "활용신청 후 serviceKey 발급",
        `.env 또는 실행 환경에 ${candidate.env} 저장`,
        "다시 example:public-data 실행"
      ]
    },
    endpointExample: candidate.endpointExample,
    params: candidate.params,
    fallback: candidate.fallback,
    safety: [
      "응답에는 제공기관과 기준일을 남기세요.",
      "대량 호출 전 이용허락범위와 rate limit을 확인하세요.",
      "개인정보가 포함될 수 있는 자료는 집계값 중심으로 사용하세요."
    ]
  };
  console.log(JSON.stringify(guide, null, 2));
}

if (!key) {
  printGuide(`${candidate.env} is not set. Public data portal APIs usually require user application and a user-provided serviceKey.`);
  process.exit(0);
}

const url = new URL(candidate.endpointExample);
for (const [k, v] of Object.entries(candidate.params)) {
  url.searchParams.set(k, v === "${DATA_GO_KR_SERVICE_KEY}" ? key : v);
}

if (dryRun) {
  console.log(JSON.stringify({
    status: "ready-dry-run",
    apiCandidate: candidate.title,
    provider: candidate.provider,
    url: url.toString().replace(key, "${DATA_GO_KR_SERVICE_KEY}"),
    note: "dry-run only; no network request was made"
  }, null, 2));
  process.exit(0);
}

const res = await fetch(url, { headers: { "User-Agent": "k-gov-skill/0.1" } });
const text = await res.text();
console.log(JSON.stringify({
  status: res.ok ? "ok" : "http-error",
  httpStatus: res.status,
  apiCandidate: candidate.title,
  provider: candidate.provider,
  requestUrl: url.toString().replace(key, "${DATA_GO_KR_SERVICE_KEY}"),
  preview: text.slice(0, 2000)
}, null, 2));
