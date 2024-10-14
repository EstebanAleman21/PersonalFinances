import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  // Get all transactions for the authenticated user
  getAll: protectedProcedure.query(async ({ ctx }) => {
    console.log('Prisma Client:', ctx.prisma); // Log the prisma instance
    if (!ctx.prisma) {
      throw new Error('Prisma Client is not initialized.');
    }
  
    return ctx.prisma.transaction.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { date: 'desc' },
    });
  }),
  

  // Create a new transaction
  create: protectedProcedure
    .input(z.object({
      date: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
      description: z.string().min(1),
      amount: z.number(),
      category: z.string().min(1),
      type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.prisma.transaction.create({
        data: {
          date: new Date(input.date),
          description: input.description,
          amount: input.amount,
          category: input.category,
          type: input.type,
          userId: ctx.session.user.id,  // Associate the transaction with the authenticated user
        },
      });
    }),

  // Update an existing transaction
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      date: z.string().refine(date => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
      description: z.string().min(1),
      amount: z.number(),
      category: z.string().min(1),
      type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.prisma.transaction.update({
        where: { id: input.id },
        data: {
          date: new Date(input.date),
          description: input.description,
          amount: input.amount,
          category: input.category,
          type: input.type,
        },
      });
    }),

  // Delete a transaction
  delete: protectedProcedure
    .input(z.object({
      id: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.prisma.transaction.delete({
        where: { id: input.id },
      });
    }),
});
