# TaskDeck(0→1)

**Tech:** TypeScript · Next.js (App Router) · GraphQL (Yoga) · Prisma · PostgreSQL


## Features
- Add / list / toggle / delete tasks
- GraphQL API backed by Prisma
- Minimal Next.js UI wired to the GraphQL endpoint

## Requirements
- **Node.js ≥ 18.18** (LTS recommended; Node 22 works)
- **PostgreSQL** (local or Docker)

## Quick Start

### 1) Install deps
```bash
npm install

2) Create .env
DATABASE_URL=postgresql://taskdeck:TaskDeckPW1!@localhost:5434/task_deck

3) Set up the DB
npx prisma migrate dev

4) Start
npm run dev
