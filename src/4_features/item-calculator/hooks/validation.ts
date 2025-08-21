import { z } from "zod";
import { ValidationErrors } from "5_entities/receive-products";

export const itemSchema = z.object({
    name: z.string().min(1, "Название обязательно"),
    length: z.string().refine(val => val !== '' && !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: "Длина должна быть больше нуля."
    }),
    width: z.string().refine(val => val !== '' && !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: "Ширина должна быть больше нуля."
    }),
    height: z.string().refine(val => val !== '' && !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: "Высота должна быть больше нуля."
    }),
    quantity: z.string().refine(val => val !== '' && !isNaN(parseInt(val)) && parseInt(val) > 0, {
        message: "Нужно, чтобы число было больше нуля."
    }),
    kgPerUnit: z.string().refine(val => val !== '' && !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: "Вес должен быть больше нуля."
    }),
    customerCode: z.string().min(1, "Код клиента обязателен"),
    customerName: z.string().min(1, "Имя клиента обязательно"),
});

export const validateItem = (item: any): ValidationErrors => {
    try {
        const itemToValidate = {
            name: item.name,
            length: item.length,
            width: item.width,
            height: item.height,
            quantity: item.quantity,
            kgPerUnit: item.kgPerUnit,
            customerCode: item.customerCode,
            customerName: item.customerName,
        };

        itemSchema.parse(itemToValidate);
        return {};
    } catch (error) {

        if (error instanceof z.ZodError) {
            const errors: ValidationErrors = {};

            if (Array.isArray(error.issues)) {
                error.issues.forEach(issue => {
                    if (issue.path && issue.path.length > 0) {
                        const fieldName = String(issue.path[0]);
                        errors[fieldName] = issue.message;
                    }
                });
            }

            return errors;
        }
        return {};
    }
};