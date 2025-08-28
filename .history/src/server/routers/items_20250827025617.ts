import { protectedProcedure, router } from "server/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { itemSchema, generalInfoSchema } from "4_features/item-calculator";

export const totalStatsSchema = z.object({
    totalVolume: z.string(),
    totalWeight: z.string(),
    avgRation: z.string()
})

export const itemsSchema = z.object({
    generalInfo: generalInfoSchema,
    items: z.array(itemSchema),
    totalStats: totalStatsSchema
})

export itemsRouter = router({
    createItems: protectedProcedure
        .input()
})