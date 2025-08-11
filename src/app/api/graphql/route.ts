import { createYoga, createSchema } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'

export const runtime = 'nodejs'
declare global {
  var __prisma: PrismaClient | undefined
}

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
const yoga = createYoga({ schema, graphqlEndpoint: '/api/graphql' })
export function GET(request: Request) {
  return yoga.fetch(request)
}
export function POST(request: Request) {
  return yoga.fetch(request)
}
