# 예제: 주민등록 인구 업무보고 패킷

`public-data-portal`의 행안부 주민등록 인구 API manifest를 이용해 업무보고용 패킷을 만듭니다.

키 없이도 샘플 구조를 볼 수 있습니다.

```bash
node scripts/population-report-packet.mjs --region 전국
```

JSON으로 보고 싶으면:

```bash
node scripts/population-report-packet.mjs --region 전국 --format json
```

실제 호출 준비는 다음 명령으로 확인합니다.

```bash
node scripts/prepare-public-data-call.mjs --api mois-resident-population
```

`DATA_GO_KR_SERVICE_KEY`가 있으면 이후 live adapter를 붙여 실제 원자료 호출 결과를 같은 패킷 구조로 변환할 수 있습니다.
