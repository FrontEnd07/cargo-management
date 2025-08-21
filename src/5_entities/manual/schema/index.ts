import { z } from "zod";
import { nameSchema, symbolSchema } from "6_shared/schema"

export const manualSchema = z.object({
    nameManual: nameSchema,
    symbolManual: symbolSchema
})

export type ManualFormSchema = z.infer<typeof manualSchema>;