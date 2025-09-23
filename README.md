# Fantasy Trading League (Monorepo)

MVP implementation of a weekly fantasy stock picking game.

## Packages
- api: Express + Prisma + Socket.IO + BullMQ
- worker: Queue processors
- web: React + Vite + Tailwind + shadcn/ui
- shared: Shared types, schemas, scoring logic

## Development
Prereqs: Node 20+, pnpm, PostgreSQL, Redis.

1. Copy .env.example to .env and fill values.
2. Install deps:
```bash
pnpm install
```
3. Generate Prisma client & migrate (after adding schema):
```bash
pnpm --filter api prisma generate
pnpm --filter api prisma migrate dev --name init
```
4. Run services:
```bash
pnpm dev:api
pnpm dev:worker
pnpm dev:web
```

## Scripts
See root package.json for dev scripts.

## Milestones

### Milestone 1 — Data & Schema
- Prisma models (User, Contest, ContestEntry, EntryPick, Leaderboard, PriceBar optional)
- MarketDataAdapter (Finnhub placeholder)
- Endpoints: /api/market/snapshot, /api/market/ohlc

### Milestone 2 — Contest Core
- POST /api/contests, publish, join, picks
- Worker jobs: schedule:prelock, contest:lock, contest:settle

### Milestone 3 — Realtime + UI
- Socket.IO leaderboard:update
- Draft & Contest rooms in web app

### Milestone 4 — Hardening
- Rate limiting, Redis caching, ticker universe filtering, basic auth

See spec in issues for extended roadmap.
