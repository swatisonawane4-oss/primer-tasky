# Primer Tasky (0→1)

Tiny end-to-end app aligned with Primer’s stack.  
**Tech:** TypeScript · Next.js (App Router) · GraphQL (Yoga) · Prisma · PostgreSQL

## Quickstart
```bash
# deps
npm install

# env (local Postgres on 5434)
echo DATABASE_URL=postgresql://primer:primerpw@localhost:5434/primer_tasky > .env

# db + prisma
npx prisma migrate dev

# run
npm run dev
# UI: http://localhost:3000   GraphQL: http://localhost:3000/api/graphql

