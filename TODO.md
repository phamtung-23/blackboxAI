# Fix CI Build Error (Missing yarn.lock)

## Steps:
- [x] Step 1: Edit .github/workflows/deploy.yml to switch from yarn to pnpm (update cache and install commands).
- [x] Step 2: cd backend && pnpm install (generate pnpm-lock.yaml).
- [x] Step 3: cd frontend && pnpm install (generate pnpm-lock.yaml).
- [x] Step 1.5: Added pnpm/action-setup@v5 step to ensure pnpm executable available in CI.
- [ ] Step 4: Commit all changes: `git add backend/pnpm-lock.yaml frontend/pnpm-lock.yaml .github/workflows/deploy.yml TODO.md && git commit -m \"Fix CI: pnpm setup + lockfiles\" && git push origin main`
- [ ] Step 5: Verify workflow passes on GitHub Actions.

Now push to test!
