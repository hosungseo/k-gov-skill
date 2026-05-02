# Release Checklist

`k-gov-skill`을 공개 업데이트할 때 확인할 최소 체크리스트입니다.

## Before commit

```bash
npm run check
npm run --silent catalog > examples/skill-catalog.json
```

## Skill quality

- 새 스킬 README가 `scripts/validate-skills.mjs`를 통과하는가?
- 사용자 신청/로그인 필요 여부가 명확한가?
- 필요한 환경변수와 키 발급처가 적혀 있는가?
- 키가 없을 때 fallback이 있는가?
- 공식 출처, 기준일, 사람 검토 지점이 남는가?

## Public safety

- `.env`, API key, 개인자료가 커밋되지 않았는가?
- 비공개 정부 문서 원문이 포함되지 않았는가?
- 자동 발송/제출/삭제를 권장하지 않는가?

## Agent readiness

- `llms.txt`가 현재 repo 구조와 맞는가?
- `examples/skill-catalog.json`이 최신인가?
- README의 첫 실행 명령이 실제로 동작하는가?
