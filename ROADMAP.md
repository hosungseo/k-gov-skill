# Roadmap

`k-gov-skill`은 작게 시작해서, 에이전트가 실제 공무원 업무를 다룰 수 있는 환경으로 확장합니다.

## v0.1 — Skill catalog foundation

Status: done

- 6개 초기 스킬
- auth/key model
- runnable examples
- `skill.json` manifests
- `llms.txt`
- CI validation

## v0.2 — Public data depth

Status: next

- `public-data-portal/apis/` manifest 확대
- data.go.kr API별 params/profile 분리
- `korean-government-api-bundle`와 직접 연결
- key missing → application guide → dry-run → live-call 흐름 정리

## v0.3 — Law and citation guard

Status: planned

- `korean-law-search` citation packet 강화
- 법령명/조문/시행일/원문 URL 필수화
- `legalize-kr` 같은 Git/Markdown 법령 corpus fallback 검토
- 환각 방지용 citation check script 추가

## v0.4 — HWP document stack

Status: planned

- HWP/HWPX read/convert/write/debug 계층 분리
- `kordoc`, `hwp5txt`, `rhwp`, HWPX XML extraction 역할표
- 샘플 HWPX 없이도 실행 가능한 mock packet 유지
- 실제 로컬 파일이 있을 때의 conversion adapter 추가

## v0.5 — Work packet workflows

Status: planned

- `org-quota-review`를 seed spec → evidence plan → issue table → draft opinion 흐름으로 고도화
- 국회 대응, 민원 답변, 보도자료 브리핑 workflow 추가
- 사람 검토 지점과 외부 발송 금지 규칙 강화

## v1.0 — K-Gov Agent Skill Hub

Status: vision

- skills + recipes + manifests + examples + CI + Plaza integration
- OpenClaw/Claude Code/Codex에서 바로 사용 가능한 행정업무 스킬 허브
- 카카오톡/텔레그램 같은 대중 UX는 이후 별도 layer로 확장
