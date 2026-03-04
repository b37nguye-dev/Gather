# Contributing to Gather

## Branch Strategy

- **main** — Production-ready, stable releases
- **dev** — Integration branch for feature work
- **feature/\*** — Per-sprint or per-feature branches (e.g. `feature/sprint1-auth`, `feature/availability-matching`)

## Workflow

1. Create feature branch from `dev`: `git checkout dev && git pull && git checkout -b feature/your-feature`
2. Commit frequently after each working feature
3. Open PR into `dev` (not main)
4. Merge to `main` only for releases

## Setup GitHub Remote

After creating a repo on GitHub:

```bash
git remote add origin https://github.com/YOUR_ORG/gather.git
git push -u origin main
git push -u origin dev
```
