import { z } from "zod";
import {
    phoneSchema,
    nameSchema,
    passSchema
} from "6_shared/schema"

//Main schema
export const registrSchema = z.object({
    phone: phoneSchema,
    name: nameSchema,
    password: passSchema,
    confirmPassword: passSchema
})
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Пароли не совпадают",
            path: ["confirmPassword"]
        }
    )

//Types
export type authRegisterTypeSchema = z.infer<typeof registrSchema>; 