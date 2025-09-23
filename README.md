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

## Next Steps
- Flesh out endpoints & validation
- Implement market data adapter
- Implement realtime contest rooms
- Add UI pages & components
