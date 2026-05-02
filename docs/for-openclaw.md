# OpenClaw에서 쓰는 법

## 기본 사용

이 저장소를 workspace에 두고 원하는 스킬 README를 OpenClaw에게 읽게 한 뒤 업무를 지시합니다.

```text
k-gov-skill의 public-data-portal 스킬 방식으로 진행해.
행안부 주민등록 인구 API 후보를 찾고, serviceKey 필요 여부와 호출 파라미터를 정리해줘.
```

## 권장 흐름

1. 스킬 README 확인
2. 사용자 key/로그인 필요 여부 확인
3. 키가 없으면 신청 방법과 fallback으로 진행
4. 결과를 업무 패킷으로 저장
5. 출처와 기준일 기록

## 큰 작업

큰 자동화는 바로 구현하지 말고 seed spec을 먼저 만듭니다.

```text
오로보로스식으로 먼저 명세 잡고 진행해.
목표, 입력, 산출물, 필요한 API key, 사람 검토 지점, 검증 기준을 정리해줘.
```
