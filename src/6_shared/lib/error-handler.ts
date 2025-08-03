import { toast } from '6_shared/utils';

interface ZodFieldErrors {
    [key: string]: string[] | undefined;
}

interface TRPCErrorData {
    zodError?: {
        fieldErrors?: ZodFieldErrors;
    };
    code?: string;
    httpStatus?: number;
    path?: string;
    stack?: string;
}

// Тип для ошибки tRPC
type TRPCError = {
    message: string;
    code: string;
    data?: TRPCErrorData;
};

export const handleTRPCError = (error: unknown): void => {
    // Проверяем, является ли ошибка объектом
    if (!error || typeof error !== 'object') {
        toast.error('Произошла неизвестная ошибка');
        return;
    }

    // Приводим к типу TRPCError
    const trpcError = error as TRPCError;

    // Обработка ошибок валидации Zod
    if (trpcError.data?.zodError?.fieldErrors) {
        const fieldErrors = trpcError.data.zodError.fieldErrors;

        // Показываем все ошибки полей
        Object.entries(fieldErrors).forEach(([field, errors]) => {
            errors?.forEach(errorMsg => {
                toast.error(`${getFieldName(field)}: ${errorMsg}`);
            });
        });

        return;
    }

    // Обработка кастомных ошибок
    if (trpcError.message) {
        toast.error(trpcError.message);
        return;
    }

    // Дефолтная ошибка
    toast.error('Произошла ошибка. Попробуйте позже.');
};

// Опционально: перевод названий полей
const getFieldName = (field: string): string => {
    const fieldNames: Record<string, string> = {
        phone: 'Телефон',
        name: 'Имя',
        password: 'Пароль',
        email: 'Email',
        confirmPassword: 'Подтверждение пароля'
    };

    return fieldNames[field] || field;
};

// Для случаев, когда нужно вернуть сообщения вместо показа toast
export const getTRPCErrorMessages = (error: unknown): string[] => {
    const messages: string[] = [];

    if (!error || typeof error !== 'object') {
        return ['Произошла неизвестная ошибка'];
    }

    const trpcError = error as TRPCError;

    if (trpcError.data?.zodError?.fieldErrors) {
        const fieldErrors = trpcError.data.zodError.fieldErrors;

        Object.entries(fieldErrors).forEach(([field, errors]) => {
            errors?.forEach(errorMsg => {
                messages.push(`${getFieldName(field)}: ${errorMsg}`);
            });
        });

        return messages;
    }

    if (trpcError.message) {
        messages.push(trpcError.message);
    } else {
        messages.push('Произошла ошибка');
    }

    return messages;
};