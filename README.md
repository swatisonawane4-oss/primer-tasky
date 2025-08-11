@"
# Primer Tasky (0→1 sample)

Tiny end-to-end app using **TypeScript + Next.js (App Router) + GraphQL (Yoga) + Prisma + PostgreSQL**.

## Run locally
1) Create \`.env\`:
\`\`\`
DATABASE_URL=postgresql://primer:primerpw@localhost:5434/primer_tasky
\`\`\`
2) Apply schema:
\`\`\`
npx prisma migrate dev
\`\`\`
3) Start dev:
\`\`\`
npm run dev
\`\`\`

- GraphQL IDE: \`/api/graphql\`
  - Examples:
    \`\`\`
    mutation { addTask(title: "Try Primer") { id title done } }
    query { tasks { id title done } }
    \`\`\`
- UI: \`/\` (add / toggle / delete tasks)

## Notes
- Prisma Client import: \`@prisma/client\`
- Key files: \`prisma/schema.prisma\`, \`src/app/api/graphql/route.ts\`, \`src/app/page.tsx\`

## Proof of work
- Brief build log + architecture notes in \`/docs\`
"@ | Set-Content -Encoding UTF8 README.md
