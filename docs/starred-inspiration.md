# Starred Repos Inspiration

서호성님 GitHub stars 중 `k-gov-skill` 기능 고도화에 바로 참고할 만한 저장소와 적용 방향입니다.

## 가장 직접적인 참고

- `NomaDamas/k-skill`: 사용자 신청/로그인 컬럼, BYOK/직접 로그인 모델.
- `Koomook/data-go-mcp-servers`: 공공데이터포털 API MCP wrapper 방향.
- `chrisryugj/korean-law-mcp`: 법령 MCP와 인용 검증.
- `chrisryugj/kordoc-ai`, `jkf87/hwpx-skill`, `edwardkim/rhwp`: HWP/HWPX read/convert/write/debug 계층화.
- `legalize-kr/legalize-kr`: 법령을 API뿐 아니라 Git/Markdown corpus로 다루는 fallback.
- `openai/skills`, `google-gemini/gemini-skills`, `obra/superpowers`: skill catalog와 작성 규약.
- `Q00/ouroboros`: 큰 업무 자동화는 seed spec → packet → execute → verify 순서로 진행.

## 다음 고도화 우선순위

1. `skill.json` manifest 도입
2. `scripts/list-skills.mjs`가 README 파싱 대신 manifest를 우선 읽게 변경
3. `korean-law-search`에 citation guard 스키마 추가
4. `public-data-portal`에 API manifest 샘플 추가
5. HWP 계열 skill을 read/convert/write/debug 계층으로 분리
