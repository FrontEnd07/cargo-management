import { z } from "zod";
import { nameSchema, currencies } from "6_shared/schema";

export const warehouseSchema = z.object({
    name: nameSchema,
    phone: nameSchema,
    currencies: currencies,
    address: nameSchema
})

export type warehouseTypeSchema = z.infer<typeof warehouseSchema>