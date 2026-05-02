# Claude Code에서 쓰는 법

Claude Code 세션에서 이 저장소를 열고, 필요한 스킬 README를 컨텍스트로 읽힌 뒤 작업을 요청합니다.

```text
Read skills/public-data-portal/README.md and recipes/public-data-first-call.md.
Help me prepare a first call to a data.go.kr API about resident population.
Do not assume I already have a serviceKey. Explain the auth path and fallback.
```

원칙: API key가 필요한 작업은 사용자가 직접 발급한 key를 사용합니다.
