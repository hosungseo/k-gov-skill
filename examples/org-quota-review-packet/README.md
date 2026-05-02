# 예제: 직제·정원 검토 패킷

기구·정원 요구자료를 바로 결론내리지 않고, 검토 가능한 업무 패킷으로 나눕니다.

```bash
node scripts/org-quota-review-packet.mjs --ministry 행정안전부 --request "디지털정부 기능 보강 정원 요구"
```

예상 산출물:

- 요청 요약
- 법령/관보/공공데이터/국회자료 확인 계획
- 쟁점표
- 보완요구 후보
- 반대검토
- 검토의견 초안

API 키가 없어도 패킷은 만들 수 있습니다. 다만 공식 API 실호출이 필요한 항목은 `needs-data` 또는 `needs-review`로 남깁니다.
