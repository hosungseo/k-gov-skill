# 예제: API manifest에서 호출 준비하기

`skills/public-data-portal/apis/*.json`에 있는 manifest를 읽어서 호출 준비 패킷을 만듭니다.

```bash
node scripts/prepare-public-data-call.mjs --api mois-resident-population
node scripts/prepare-public-data-call.mjs --api molit-apartment-trade
node scripts/prepare-public-data-call.mjs --api ecos-interest-rate
```

키가 없으면 `needs-user-key`와 신청 절차를 출력합니다. 키가 있으면 요청 URL을 만들되, 출력에서는 key를 환경변수명으로 마스킹합니다.
