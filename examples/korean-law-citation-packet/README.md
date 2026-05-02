# 예제: 법령 인용 검증 패킷

법령 검색 결과를 그냥 요약하지 않고, 업무 문서에 붙일 수 있는 citation packet으로 정리합니다.

```bash
node scripts/korean-law-citation-packet.mjs --law 정부조직법 --article 제34조
```

`LAW_GO_KR_OC`가 있으면 법제처 API 확인 경로로 갈 수 있고, 없으면 공개 검색/수동 확인 fallback을 안내합니다.

패킷 필수 요소:

- 법령명
- 조문번호
- 원문 인용 발췌
- 시행일
- 원문 URL/API 경로
- 확인일
- confidence
- 사람 검토 필요 여부
