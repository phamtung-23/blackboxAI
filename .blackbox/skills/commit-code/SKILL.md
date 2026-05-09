---
name: commit-code
description: A skill for commit code with best practice - guiding how to write good commit messages and create meaningful commits
---

# Commit Code

## Instructions

Provide clear, step-by-step guidance for Blackbox agents on how to use this skill effectively.

1. **Before committing:**
   - Run `git status` to see what files have changed
   - Run `git diff HEAD` to review all changes (including unstaged changes) to tracked files
   - Run `git diff --staged` to review only staged changes
   - Run `git log -n 3` to review recent commit messages and match their style

2. **Stage files appropriately:**
   - Use `git add <file>` for specific files
   - Use `git add .` to stage all changes (use with caution)
   - Consider using interactive staging with `git add -p` for partial staging

3. **Write meaningful commit messages:**
   - Use imperative mood: "Add feature" not "Added feature"
   - First line: Max 50 characters, concise summary
   - Body: Explain what and why, not how (code shows how)
   - Reference issues/tickets when applicable: "Fix #123" or "Closes #456"

4. **Create the commit:**
   - Use `git commit -m "message"` for simple commits
   - Use `git commit` (without -m) for multi-line messages in editor
   - Or use `git commit -m "title" -m "description"` for multi-line

5. **After committing:**
   - Run `git status` to confirm clean state
   - Review your commit with `git log -n 1 --stat`

## Branching, Merging, and Pushing

### Create and switch to a new branch:
```
git checkout -b feature/my-new-feature
```

Or with modern Git:
```
git switch -c feature/my-new-feature
```

### Push the new branch to remote:
```
git push -u origin feature/my-new-feature
```

### Merge branch to main:
```
# First, switch to main and pull latest
git checkout main
git pull origin main

# Merge your feature branch
git merge feature/my-new-feature

# Push the merge to remote
git push origin main
```

### Delete branch after merge (optional):
```
# Delete local branch
git branch -d feature/my-new-feature

# Delete remote branch
git push origin --delete feature/my-new-feature
```

### Rebase onto main (alternative to merge):
```
git checkout feature/my-new-feature
git rebase main
# If conflicts, resolve them then:
git push --force-with-lease
```

### Pull Request workflow:
```
# Push your branch
git push -u origin feature/my-new-feature

# Create PR via GitHub CLI (if available)
gh pr create --title "Add new feature" --body "Description..."
```

## Examples

### Simple commit:
```
git add src/utils/helpers.ts
git commit -m "Add date formatting utility function"
```

### Feature commit:
```
git add src/components/Button.tsx src/components/Button.test.tsx
git commit -m "Add Button component with loading state

- Implemented button with three variants: primary, secondary, ghost
- Added loading spinner during async operations
- Added unit tests for all button states
Closes #42
```

### Bug fix commit:
```
git add src/api/client.ts
git commit -m "Fix authentication token expiration handling

Token was not being refreshed before expiration.
Now refreshes 5 minutes before expiry to prevent auth errors.
Fixes #87
```

### Refactor commit:
```
git add src/services/data-service.ts
git commit -m "Refactor data service to use repository pattern

Extracted data access logic into repository classes.
Improved testability and added dependency injection.
```

## Best Practices

1. **Commit early, commit often:** Smaller, focused commits are easier to review and understand

2. **One logical change per commit:** Don't mix unrelated changes in a single commit

3. **Write descriptive messages:**
   - Bad: "Fixed stuff" or "Updates"
   - Good: "Fix login redirect loop for expired sessions"

4. **Use conventional commits (optional):**
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting
   - `refactor:` for code restructuring
   - `test:` for adding tests
   - `chore:` for maintenance

5. **Review before committing:** Always check what you're committing to avoid secrets or unnecessary files

6. **Never amend public commits:** Once pushed, don't amend commits unless you're sure no one else has pulled

7. **Match project style:** Follow the commit message style used in your project's recent history