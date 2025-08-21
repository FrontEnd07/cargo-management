import { z } from "zod";
import {
    phoneSchema,
    passSchema
} from "6_shared/schema"

// Main schema
export const loginSchema = z.object({
    phone: phoneSchema,
    password: passSchema,
});


//Types
export type authLoginTypeSchema = z.infer<typeof loginSchema>;