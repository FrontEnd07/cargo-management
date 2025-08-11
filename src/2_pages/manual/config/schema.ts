import { z } from "zod";
import { nameSchema, symbolSchema } from "6_shared/utils"

export const addCurrencySchema = z.object({
    nameCurrency: nameSchema,
    symbolСurrency: symbolSchema
})

//Types
export type addCurrencyTypeSchema = z.infer<typeof addCurrencySchema>;