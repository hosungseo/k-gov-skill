# k-gov-skill

공공 API 문서 뒤지고, 관보 PDF 열고, 법령 조문 복사하고, HWP 검토자료에서 쟁점 뽑는 일.  
공무원 업무에서 자주 반복되지만 에이전트에게 그냥 맡기기 어려운 일들을 **스킬과 레시피**로 묶습니다.

`k-gov-skill`은 한국 공무원을 위한 행정업무 AI 스킬 모음집입니다. Claude Code, Codex, OpenClaw, Cursor 같은 에이전트가 법령, 공공데이터포털, 관보, 국회자료, HWP/HWPX 문서, 직제·정원 검토 업무를 바로 다룰 수 있게 합니다.

처음 대상은 모든 공무원이 아닙니다. GitHub, API key, 에이전트 도구에 관심 있는 소수의 바이브코딩 공무원을 위한 출발점입니다. 이들이 먼저 써보고, 고치고, 자기 업무에 맞게 확장할 수 있는 환경을 목표로 합니다.

## 환경광장과 연결

`k-gov-skill`은 독립 스킬 저장소이지만, 전시와 탐색은 [K-Gov Agent Plaza](https://kgov-ready-demo.vercel.app/plaza)에서 볼 수 있습니다.

- Plaza featured card: https://kgov-ready-demo.vercel.app/plaza
- Skill API: https://kgov-ready-demo.vercel.app/api/skills
- Asset catalog: https://kgov-ready-demo.vercel.app/api/repos

## 에이전트 진입점

- [`llms.txt`](llms.txt) — 에이전트가 먼저 읽는 요약
- [`examples/skill-catalog.json`](examples/skill-catalog.json) — 기계가 읽는 스킬 카탈로그
- [`.well-known-agent.json`](.well-known-agent.json) — agent-facing manifest 초안

## 30초 안에 감 잡기

키 없이도 먼저 실행해볼 수 있습니다.

```bash
npm run example:public-data
npm run example:gazette
npm run example:org-quota
npm run example:hwp
npm run example:law
```

공공데이터포털 `serviceKey`가 없으면 에러를 내는 대신, 어떤 API를 신청해야 하는지, 어떤 환경변수를 넣어야 하는지, 어떤 파라미터가 필요한지 JSON으로 안내합니다.

스킬 목록은 에이전트가 읽기 쉬운 JSON으로도 볼 수 있습니다.

```bash
node scripts/list-skills.mjs
npm run catalog:public-data
```

처음이라면 [시작하기](docs/getting-started.md)를 먼저 보세요.

## 왜 필요한가

공무원 업무의 병목은 “AI가 똑똑하지 않아서”만이 아닙니다. 자료가 흩어져 있고, 공공 API는 활용신청이 필요하고, 관보와 보도자료는 에이전트가 읽기 불편하고, HWP 문서는 일반 개발 도구와 잘 맞지 않습니다.

이 저장소는 그 사이를 메우는 얇은 층입니다. 거대한 시스템을 만들기보다, 실무자가 자주 부딪히는 행정업무를 작은 스킬로 나누고, 각 스킬마다 권한·키·출처·fallback·안전경계를 명확히 적습니다.

## 바로 써볼 수 있는 것

| 할 수 있는 일 | 스킬 이름 | 설명 | 사용자 신청/로그인 | 문서 |
|---|---|---|---|---|
| 공공데이터포털 API 준비/호출 | `public-data-portal` | API 후보 탐색, 활용신청 여부, serviceKey 환경변수, 호출 파라미터 정리 | 필요/선택 | [가이드](skills/public-data-portal/README.md) |
| 법령 검색 | `korean-law-search` | 법령/조문 중심 검색과 인용 후보 정리 | 선택 | [가이드](skills/korean-law-search/README.md) |
| 관보 검색 | `official-gazette-search` | 고시·공고·직제·입법예고를 관보 코퍼스에서 검색 | 불필요 | [가이드](skills/official-gazette-search/README.md) |
| 국회자료 검색 | `national-assembly-search` | 의안·회의록·일정·질의 대응 자료 탐색 | 필요/선택 | [가이드](skills/national-assembly-search/README.md) |
| HWP/HWPX 문서 처리 | `hwp-document-tools` | HWP/HWPX 읽기, Markdown 변환, 표/쟁점 추출 | 불필요 | [가이드](skills/hwp-document-tools/README.md) |
| 직제·정원 검토 패킷 | `org-quota-review` | 요구자료를 쟁점표·근거표·검토의견 초안으로 변환 | 선택 | [가이드](skills/org-quota-review/README.md) |

## 이런 식으로 씁니다

OpenClaw에게는 이렇게 시킬 수 있습니다.

```text
k-gov-skill의 public-data-portal 스킬 방식으로 진행해.
행안부 주민등록 인구 API 후보를 찾고, serviceKey 필요 여부와 호출 파라미터를 정리해줘.
키가 없으면 신청 방법과 fallback을 먼저 알려줘.
```

Claude Code나 Codex에서는 이렇게 시작할 수 있습니다.

```text
Read skills/public-data-portal/README.md and recipes/public-data-first-call.md.
Prepare the first data.go.kr API call for resident population.
Do not assume I already have a serviceKey.
```

## 첫 레시피

- [공공데이터포털 API 첫 호출 준비](recipes/public-data-first-call.md)
- [관보 직제·정원 Watch 예제](examples/gazette-jikje-watch/README.md)
- [직제·정원 검토 패킷 예제](examples/org-quota-review-packet/README.md)
- [HWP/HWPX 문서 검토 패킷 예제](examples/hwp-document-packet/README.md)
- [법령 인용 검증 패킷 예제](examples/korean-law-citation-packet/README.md)
- [관보에서 직제·정원 관련 고시 찾기](recipes/gazette-jikje-watch.md)
- [부처별 보도자료 브리핑](recipes/ministry-press-briefing.md)

## 권한/키 원칙

이 저장소는 공공 API 키를 대신 제공하지 않습니다. 공공데이터포털 API처럼 활용신청이 필요한 경우 사용자가 직접 신청한 키를 연결해야 합니다.

키가 없을 때는 실패 대신 다음을 제공합니다.

- 어떤 API를 신청해야 하는지
- 필요한 환경변수명
- 주요 파라미터
- 샘플 또는 공개 코퍼스 기반 fallback
- 출처와 기준일 기록 방식

자세한 내용은 [인증/키 모델](docs/auth-model.md)을 보세요.

## 에이전트별 사용법

- [OpenClaw에서 쓰는 법](docs/for-openclaw.md)
- [Claude Code에서 쓰는 법](docs/for-claude-code.md)
- [Codex에서 쓰는 법](docs/for-codex.md)
- [안전 원칙](docs/safety.md)

## 기존 자산과 연결

이 저장소는 빈손으로 시작하지 않습니다. 이미 만들어둔 공개 행정업무 자산들을 스킬과 레시피로 연결합니다.

- [`korean-government-api-bundle`](https://github.com/hosungseo/korean-government-api-bundle) — 한국 정부 API 도구 번들
- [`kgov-ready-demo`](https://github.com/hosungseo/kgov-ready-demo) — 에이전트용 정부 환경광장 시안
- [`ai-readable-government`](https://github.com/hosungseo/ai-readable-government) — 보도자료+관보 reader
- [`gov-press-md`](https://github.com/hosungseo/gov-press-md) — 정책브리핑 Markdown DB
- [`ai-readable-gazette-kr`](https://github.com/hosungseo/ai-readable-gazette-kr) — 관보 Markdown 코퍼스
- [`agent-ready-check`](https://github.com/hosungseo/agent-ready-check) — agent-ready 스캐너

## 기여하기

- [스킬 작성 가이드](docs/skill-author-guide.md)
- [Contributing](CONTRIBUTING.md)
- 새 스킬 제안은 GitHub Issue의 `새 행정업무 스킬 제안` 템플릿을 사용하면 됩니다.

## 안전 원칙

- 공식 출처와 기준일을 남깁니다.
- API key 요구를 숨기지 않습니다.
- 개인정보·민감정보·처분 판단은 자동화하지 않습니다.
- 외부 발송/제출/삭제는 사람 승인 전제로 둡니다.

## 참고한 GitHub stars

기능 고도화 참고 목록은 [Starred Repos Inspiration](docs/starred-inspiration.md)에 정리했습니다. 특히 `k-skill`, `data-go-mcp-servers`, `korean-law-mcp`, `kordoc-ai`, `hwpx-skill`, `legalize-kr` 방향을 반영합니다.

## 품질 확인

이 repo는 GitHub Actions에서 `npm run check`를 실행합니다. 로컬에서는 아래 명령으로 같은 검증을 할 수 있습니다.

```bash
npm run check
npm run --silent catalog > examples/skill-catalog.json
```

릴리스 전에는 [release checklist](docs/release-checklist.md)를 확인합니다.

## 프로젝트 상태

- [Status](STATUS.md)
- [Roadmap](ROADMAP.md)

## 상태

초기 draft입니다. 지금은 문서와 첫 runnable example을 중심으로 구성되어 있으며, 공개 repo 생성 전 로컬에서 구조를 다듬는 단계입니다.
