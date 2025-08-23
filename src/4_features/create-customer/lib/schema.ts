import { z } from 'zod';
import { nameSchema, phoneSchema, dateSchema, addressSchema, codesSchema } from '6_shared/schema';

// Main schema
export const addCustomerSchema = z.object({
    name: nameSchema,
    phone: phoneSchema,
    date: dateSchema,
    address: addressSchema,
    codes: codesSchema
});

// Types
export type addCustomerTypesSchema = z.infer<typeof addCustomerSchema>;