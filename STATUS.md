# Status

Current public repo: https://github.com/hosungseo/k-gov-skill

## Current version shape

- Public repository: yes
- CI: yes
- `llms.txt`: yes
- skill manifests: yes
- runnable examples: 7
- Plaza integration: yes
- Live Plaza featured asset verification: yes

## Runnable examples

```bash
npm run example:public-data
npm run example:gazette
npm run example:org-quota
npm run example:hwp
npm run example:law
npm run example:prepare-api
npm run example:population-report
```

## Current constraints

- Public data live calls require user-provided API keys.
- HWP/HWPX example is a packet generator, not a full converter yet.
- Law citation example creates a citation packet template; live law API check requires optional `LAW_GO_KR_OC` or manual verification.
- Messenger UX is intentionally out of scope for now.

## Next recommended task

Expand `skills/public-data-portal/apis/` with more high-value public-sector APIs and connect them to `korean-government-api-bundle`, or deepen the adapter side so the same API ids can be demonstrated through both the skill docs and the live tool bundle.
