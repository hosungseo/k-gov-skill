# 예제: 공공데이터포털 API 첫 호출

이 예제는 공공데이터포털 API를 처음 붙일 때의 기본 동작을 보여줍니다.

## 키가 없을 때

```bash
npm run example:public-data
```

`DATA_GO_KR_SERVICE_KEY`가 없으면 실패하지 않고 다음을 안내합니다.

- 어떤 API 후보를 볼지
- 어디서 활용신청할지
- 어떤 환경변수를 넣을지
- 어떤 파라미터가 필요한지
- 키 없을 때 fallback은 무엇인지

## 키가 있을 때

```bash
DATA_GO_KR_SERVICE_KEY="발급받은키" npm run example:public-data
```

실제 API 호출을 시도하고, 요청 URL에서 key는 `${DATA_GO_KR_SERVICE_KEY}`로 마스킹해 출력합니다.

## dry-run

```bash
DATA_GO_KR_SERVICE_KEY="dummy" npm run example:public-data -- --topic population --dry-run
```

네트워크 호출 없이 URL과 파라미터만 확인합니다.

## topic

현재 예시 topic:

- `population`: 행정안전부 주민등록 인구현황
- `apartment`: 국토교통부 아파트 매매 실거래자료
