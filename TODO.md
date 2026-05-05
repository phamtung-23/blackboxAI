# Fix CI Build Error (Missing yarn.lock)

## Steps:
- [x] Step 1: Edit .github/workflows/deploy.yml to switch from yarn to pnpm (update cache and install commands).
- [x] Step 2: cd backend && pnpm install (generate pnpm-lock.yaml).
- [x] Step 3: cd frontend && pnpm install (generate pnpm-lock.yaml).
- [ ] Step 4: Commit pnpm-lock.yaml files and workflow changes, push to trigger CI.
- [ ] Step 5: Verify workflow passes (lint & deploy).

Progress updated. Next: git add backend/pnpm-lock.yaml frontend/pnpm-lock.yaml .github/workflows/deploy.yml && git commit -m \"Fix CI: switch to pnpm + add lockfiles\" && git push

