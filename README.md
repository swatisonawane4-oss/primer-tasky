@"
# Primer Tasky

Tiny 0→1 app using **TypeScript + Next.js (App Router) + GraphQL (Yoga) + Prisma + PostgreSQL**.

## Run locally
1) Set DB: \`.env\`  
   \`DATABASE_URL=postgresql://primer:primerpw@localhost:5433/primer_tasky\`
2) Migrate: \`npx prisma migrate dev\`
3) Dev server: \`npm run dev\` → http://localhost:3000

## GraphQL
- Endpoint: \`/api/graphql\`
- Example:
  - \`mutation { addTask(title: "Try Primer") { id title done } }\`
  - \`query { tasks { id title done } }\`

## Notes
- Prisma Client import from \`@/generated/prisma\`
- Minimal UI: add / toggle / delete tasks
"@ | Set-Content -Encoding UTF8 README.md
