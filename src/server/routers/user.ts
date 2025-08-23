import { z } from "zod";
import { protectedProcedure, router } from "server/trpc";

export const userRouter = router({
    getUserById: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        ).query(async ({ ctx, input }) => {
            const userById = await ctx.db.user.findFirst({
                where: {
                    id: input.userId
                },
                select: {
                    name: true,
                    phone: true,
                    role: true,
                }
            })

            return userById;
        }),

    getUserAll: protectedProcedure
        .input(
            z.object({
                search: z.string(),
            })
        ).query(async ({ ctx, input }) => {
            const user = await ctx.db.user.findMany({
                where: input.search ? { name: { contains: input.search } } : undefined,
                orderBy: { createdAt: "desc" },
                take: 5
            })

            return user.map(({ id, name, role, phone }) => ({ id, name, role, phone }))
        })
})