# Codex에서 쓰는 법

Codex CLI 또는 Codex 기반 에이전트에서 이 저장소를 열고 스킬 문서를 기준으로 구현/분석 작업을 시킵니다.

```text
Use k-gov-skill public-data-portal conventions.
Create a small script that reads DATA_GO_KR_SERVICE_KEY from env and calls the selected endpoint.
If the env var is missing, fail with a helpful application guide, not a stack trace.
```

검증 기준:
- build/test 통과
- 키 누락 시 친절한 안내
- 호출 URL/파라미터/기준일 로그
