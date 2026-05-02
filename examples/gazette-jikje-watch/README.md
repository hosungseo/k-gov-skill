# 예제: 관보 직제·정원 Watch

관보 검색은 공공데이터포털 serviceKey 없이도 공개 코퍼스 기반으로 시작할 수 있습니다.

```bash
node scripts/gazette-jikje-watch.mjs
```

키워드와 기간을 바꾸려면:

```bash
node scripts/gazette-jikje-watch.mjs --days 14 --keywords 직제,정원,기구,총액인건비
```

이 예제는 실제 관보 코퍼스를 대량 검색하기 전, 에이전트가 어떤 출처를 보고 어떤 업무 패킷을 만들어야 하는지 JSON으로 정리합니다.

예상 산출물:

- 검색 조건
- 확인한 코퍼스/출처
- 문서 후보 목록
- 기관·게재일·문서유형
- 관련 키워드 매칭 근거
- 직제·정원 검토 쟁점
- 원문 대조 필요 지점
