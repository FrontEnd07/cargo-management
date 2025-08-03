import { z } from "zod";
import {
    phoneSchema,
    passSchema
} from "6_shared/utils"

// Main schema
export const loginSchema = z.object({
    phone: phoneSchema,
    password: passSchema,
});


//Types
export type authLoginTypeSchema = z.infer<typeof loginSchema>;