import { createYoga, createSchema } from 'graphql-yoga'
import { NextRequest } from 'next/server'
import { PrismaClient } from '@/generated/prisma'

export const runtime = 'nodejs' // ensure Prisma runs in the Node runtime

// Reuse Prisma in dev to avoid too many connections on hot reload
const prisma = (globalThis as any).__prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') (globalThis as any).__prisma = prisma

const typeDefs = /* GraphQL */ `
  type Task { id: ID!, title: String!, done: Boolean!, createdAt: String! }
  type Query { tasks: [Task!]! }
  type Mutation {
    addTask(title: String!): Task!
    toggleTask(id: ID!): Task!
    deleteTask(id: ID!): Boolean!
  }
`

const resolvers = {
  Query: {
    tasks: () => prisma.task.findMany({ orderBy: { createdAt: 'desc' } }),
  },
  Mutation: {
    addTask: (_: unknown, { title }: { title: string }) =>
      prisma.task.create({ data: { title } }),
    toggleTask: async (_: unknown, { id }: { id: string }) => {
      const current = await prisma.task.findUnique({ where: { id: Number(id) } })
      if (!current) throw new Error('Task not found')
      return prisma.task.update({
        where: { id: Number(id) },
        data: { done: !current.done },
      })
    },
    deleteTask: async (_: unknown, { id }: { id: string }) => {
      await prisma.task.delete({ where: { id: Number(id) } })
      return true
    },
  },
}

const schema = createSchema({ typeDefs, resolvers })
const yoga = createYoga<{ req: NextRequest }>({
  schema,
  graphqlEndpoint: '/api/graphql',
})

export async function GET(request: NextRequest) {
  return yoga.handleRequest(request)
}
export async function POST(request: NextRequest) {
  return yoga.handleRequest(request)
}
