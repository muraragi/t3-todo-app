import { createRouter } from './context'
import { z } from 'zod'
import { Todo } from '@prisma/client'

const updateTodoSchema = z.object({
  title: z.string().optional(),
  isDone: z.boolean().optional(),
  id: z.string().uuid()
})

export const todoRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.todo.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
    }
  })
  .mutation('create', {
    input: z.object({
      title: z.string()
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.create({
        data: {
          title: input.title
        }
      })
    }
  })
  .mutation('update', {
    input: updateTodoSchema,
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          isDone: input.isDone
        }
      })
    }
  })
  .mutation('delete', {
    input: z.object({
      id: z.string().uuid()
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.delete({
        where: {
          id: input.id
        }
      })
    }
  })
