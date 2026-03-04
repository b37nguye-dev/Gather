# Gather

Social scheduling app for friend groups. Sprint 1: Auth + Database Foundation.

## Stack

- **Frontend:** React 18 + TypeScript + Tailwind CSS (Vite)
- **Backend:** Node.js + Express + TypeScript
- **Database:** Prisma + PostgreSQL (Supabase)
- **Auth:** JWT (access 15min, refresh 7 days) + httpOnly cookie
- **Hosting:** Railway (API), Vercel (web), Supabase (Postgres)

## Prerequisites

- Node.js 20+ (see `.nvmrc`)
- PostgreSQL (Supabase or local Docker)
- npm

## Local PostgreSQL (Docker)

For offline development with a consistent local database:

```bash
docker compose up -d
```

Then set in `.env`:

```
DATABASE_URL="postgresql://gather:gather_dev@localhost:5432/gather"
DIRECT_URL="postgresql://gather:gather_dev@localhost:5432/gather"
```

Run migrations: `npm run db:migrate`

## Setup

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:
   - `DATABASE_URL` — PostgreSQL connection string (Supabase or local Docker)
   - `DIRECT_URL` — Same for local; Supabase uses session pooler port 5432
   - `ACCESS_TOKEN_SECRET` — min 32 chars (JWT signing)
   - `OAUTH_ENCRYPTION_KEY` — 32 bytes hex or base64 (for Phase 2)
   - `CORS_ORIGIN` — frontend URL (e.g. `http://localhost:5173` for dev)

3. **Run migrations**

   ```bash
   npm run db:migrate
   ```

4. **Start development**

   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:5173
   - API: http://localhost:3001

   The Vite dev server proxies `/api` to the backend, so credentials (cookies) work in dev.

## Scripts

| Command          | Description                 |
| ---------------- | --------------------------- |
| `npm run dev`    | Start frontend + API in dev |
| `npm run build`  | Build all workspaces        |
| `npm run lint`   | Run ESLint                  |
| `npm run format` | Format with Prettier        |
| `db:generate`    | Generate Prisma client      |
| `db:migrate`     | Run migrations              |
| `db:push`        | Push schema (no migration)  |
| `db:studio`      | Open Prisma Studio          |

## Project structure

```
gather/
├── apps/
│   ├── api/     # Express backend
│   ├── web/     # Vite + React frontend
│   └── mobile/  # Expo (React Native)
├── packages/
│   └── shared/  # Shared types
├── prisma/      # Schema + migrations
└── .env.example
```

## Auth

- **Register:** `POST /api/auth/register` — returns `{ accessToken, user }`, sets refresh cookie
- **Login:** `POST /api/auth/login` — returns `{ accessToken, user }`, sets refresh cookie
- **Refresh:** `POST /api/auth/refresh` — reads cookie, returns `{ accessToken, user }`
- **Logout:** `POST /api/auth/logout` — clears cookie
- **Me:** `GET /api/auth/me` — requires `Authorization: Bearer <accessToken>`

Rate limits: login 10/15min, register 5/hour, refresh 20/15min per IP. Returns 429 with "Too many attempts, try again later."

## Deployment

- **Railway (API):** Set env vars, run `prisma migrate deploy` before start, then `node dist/index.js`
- **Vercel (web):** Build from `apps/web`, set `VITE_API_URL` to Railway API URL
- **Supabase:** Create project, copy connection string to `DATABASE_URL`
