import { protectedProcedure, router } from "server/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { itemSchema, generalInfoSchema } from "4_features/item-calculator"

export itemsRouter = router({
    createItems: protectedProcedure
        .input()
})