# K-Gov Ready Demo Integration

`k-gov-skill`은 독립 저장소이고, `kgov-ready-demo`는 환경광장입니다. 두 저장소는 서로를 다음 방식으로 연결합니다.

## From Plaza to Skill Hub

- Plaza: https://kgov-ready-demo.vercel.app/plaza
- Skill API: https://kgov-ready-demo.vercel.app/api/skills
- Asset catalog: https://kgov-ready-demo.vercel.app/api/repos

`/api/skills`는 에이전트가 `k-gov-skill`을 발견하도록 아래 정보를 제공합니다.

- repository URL
- `llms.txt`
- skill catalog
- public data API catalog
- first run guide
- runnable examples
- public data API ids
- auth model

## From Skill Hub to Plaza

`k-gov-skill` README는 Plaza와 `/api/skills`를 다시 링크합니다. 사용자는 스킬 저장소에서 실행 예제를 보고, Plaza에서는 전체 공공업무 환경광장 안에서 다른 자산과 함께 탐색합니다.

## Current exposed runnable examples

```bash
npm run example:public-data
npm run example:gazette
npm run example:org-quota
npm run example:hwp
npm run example:law
npm run example:prepare-api
```

## Current public data API ids

- `mois-resident-population`
- `molit-apartment-trade`
- `neis-school-lunch`
- `ecos-interest-rate`
- `kosis-population`

## Verification notes

As of 2026-05-02, the live Skill API returned the public data API catalog URL, runnable examples, and `kosis-population` marker. The latest `k-gov-skill` GitHub Actions check was successful.
