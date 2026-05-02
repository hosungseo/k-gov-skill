# 시작하기

## 1. 저장소 받기

```bash
git clone https://github.com/hosungseo/k-gov-skill.git
cd k-gov-skill
```

아직 공개 repo가 없다면 이 draft 폴더에서 그대로 실험합니다.

## 2. 스킬 목록 보기

```bash
node scripts/list-skills.mjs
```

## 3. 공공데이터포털 첫 예제 실행

키 없이 먼저 실행합니다.

```bash
npm run example:public-data
```

정상이라면 `needs-user-key` 안내가 나옵니다. 이것은 실패가 아니라 의도된 동작입니다.

## 4. 키가 있을 때

```bash
DATA_GO_KR_SERVICE_KEY="발급받은키" npm run example:public-data
```

키는 절대 GitHub에 커밋하지 않습니다.

## 5. OpenClaw에 시키기

```text
k-gov-skill-draft의 public-data-portal 스킬과 public-data-first-call 예제를 기준으로,
행안부 인구 API 호출 준비 패킷을 만들어줘.
키가 없으면 신청 방법과 fallback을 먼저 정리해줘.
```
