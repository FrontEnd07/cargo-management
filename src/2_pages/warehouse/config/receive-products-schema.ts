import { z } from "zod";

const itemSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Название обязательно"),
    length: z.string().min(1, "Длина обязательна").refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        "Длина должна быть положительным числом"
    ),
    width: z.string().min(1, "Ширина обязательна").refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        "Ширина должна быть положительным числом"
    ),
    height: z.string().min(1, "Высота обязательна").refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        "Высота должна быть положительным числом"
    ),
    quantity: z.string().min(1, "Количество обязательно").refine(
        (val) => !isNaN(parseInt(val)) && parseInt(val) > 0,
        "Количество должно быть положительным целым числом"
    ),
    kgPerUnit: z.string().min(1, "Вес обязателен").refine(
        (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
        "Вес должен быть положительным числом"
    ),
    totalVolume: z.string(),
    totalWeight: z.string(),
    ratio: z.string(),
});

const formSchema = z.object({
    items: z.array(itemSchema).min(1, "Добавьте хотя бы одну строку"),
});

// ==================== Типы ====================
type ItemFormData = z.infer<typeof itemSchema>;
type FormValues = z.infer<typeof formSchema>;