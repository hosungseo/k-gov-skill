# official-gazette-search

관보의 고시·공고·직제·입법예고·인사 관련 문서를 찾아 에이전트가 읽을 수 있는 근거 목록으로 정리하는 스킬입니다.

## 사용자 신청/로그인

불필요.

공개 관보 코퍼스와 Markdown/metadata 저장소를 우선 사용합니다.

## 필요한 환경변수

없음.

## 연결 자산

- https://github.com/hosungseo/ai-readable-gazette-kr
- https://github.com/hosungseo/gov-gazette-md

## 사용 예시 프롬프트

```text
최근 관보에서 직제, 정원, 조직개편, 입법예고 관련 문서를 찾아줘.
기관명, 문서일, 문서유형, 원문 링크, 검토 쟁점을 표로 정리해줘.
```

## 예상 산출물

- 문서명
- 게재일
- 기관명
- 문서유형
- 관련 키워드
- 원문/PDF/readable 링크
- 직제·정원 검토 관점의 쟁점

## 키 없을 때 fallback

기본적으로 키가 필요 없습니다. 원문 PDF 추출 품질이 낮으면 metadata와 readable layer를 분리해 표시합니다.

## 주의

- 관보 문서는 원문 날짜와 문서번호가 중요합니다.
- PDF 추출 텍스트는 오탈자 가능성이 있으므로 중요 인용은 원문 확인을 권합니다.
