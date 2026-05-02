# 예제: HWP/HWPX 문서 검토 패킷

공무원 업무에서 HWP/HWPX는 가장 자주 만나는 병목입니다. 이 예제는 파일을 바로 외부에 올리지 않고, 로컬 처리 원칙과 추출 계획을 먼저 패킷화합니다.

```bash
node scripts/hwp-document-packet.mjs --file 검토자료.hwpx
```

예상 산출물:

- 원문 구조 보존 Markdown
- 표 목록
- 요구사항 목록
- 쟁점표
- 보완요청 후보
- 원문 대조 필요 지점

주의: 이 스크립트 자체가 HWP를 변환하지는 않습니다. 에이전트가 로컬 도구(`hwp5txt`, `kordoc`, `rhwp`, HWPX XML extraction)를 어떤 순서로 써야 하는지 안내하는 패킷 생성기입니다.
