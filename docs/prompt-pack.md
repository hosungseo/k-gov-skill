# Prompt Pack

`k-gov-skill`을 처음 쓰는 공무원/에이전트 사용자용 복붙 프롬프트입니다.

## 1. 공공데이터포털 API 붙이기

```text
k-gov-skill의 public-data-portal 방식으로 진행해.
[주제] 관련 공공데이터포털 API 후보를 찾고, 활용신청 필요 여부, 필요한 환경변수, 주요 파라미터, 키 없을 때 fallback을 정리해줘.
결과는 API 후보표와 첫 호출 준비 패킷으로 나눠줘.
```

## 2. API manifest에서 호출 준비하기

```text
k-gov-skill의 public-data API manifest를 기준으로 [api-id] 호출 준비 패킷을 만들어줘.
키가 없으면 needs-user-key 상태로 신청 경로와 파라미터를 안내하고, 키가 있으면 요청 URL을 만들되 key는 마스킹해줘.
```

## 3. 법령 인용 검증

```text
k-gov-skill의 korean-law-search citation packet 방식으로 [법령명] [조문번호]를 확인해줘.
요약하지 말고 원문 조문 발췌, 시행일, 원문 URL/API 경로, 확인일, confidence, 사람 검토 필요 여부를 남겨줘.
```

## 4. 관보 직제·정원 Watch

```text
k-gov-skill의 official-gazette-search 방식으로 최근 [기간] 관보에서 직제, 정원, 조직개편, 입법예고 관련 문서를 찾아줘.
문서명, 게재일, 기관명, 문서유형, 원문/readable 링크, 직제·정원 검토 쟁점을 표로 정리해줘.
중요 인용은 원문 PDF 대조 필요 여부를 표시해줘.
```

## 5. HWP/HWPX 검토자료 패킷화

```text
k-gov-skill의 hwp-document-tools 방식으로 [파일명]을 분석해줘.
외부 업로드 없이 로컬에서 처리하고, 원문 구조 보존 Markdown, 표 목록, 요구사항, 쟁점표, 보완요청 후보, 원문 대조 필요 지점을 나눠줘.
```

## 6. 직제·정원 검토 패킷

```text
k-gov-skill의 org-quota-review 방식으로 [부처명]의 [요구사항]을 검토 패킷화해줘.
요청 요약, 법령·관보·공공데이터·국회자료 확인 계획, 쟁점표, 보완요구 후보, 반대검토, 검토의견 초안을 나눠줘.
키나 원문이 없어 확인하지 못한 항목은 사람 검토 필요로 표시해줘.
```

## 7. 처음 쓰는 에이전트에게 repo 읽히기

```text
이 저장소의 llms.txt, README.md, examples/skill-catalog.json, docs/auth-model.md를 먼저 읽어.
그 다음 내 업무 요청을 어떤 skill과 recipe로 처리할지 추천하고, 필요한 API key나 사람 검토 지점을 먼저 알려줘.
```
