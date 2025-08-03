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
        })
})