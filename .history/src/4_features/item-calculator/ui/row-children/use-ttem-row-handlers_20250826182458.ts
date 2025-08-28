import { useCallback, useMemo } from "react";
import { Item } from "5_entities/receive-products";

export const useItemRowHandlers = (
    index: number,
    onChange: (index: number, field: keyof Item, value: string) => void
) => {
    // Убираем item из зависимостей и создаем стабильные обработчики
    const handlers = useMemo(() => ({
        handleInput: (field: keyof Item, value: string) => {
            onChange(index, field, value);
        },

        handleSelectChange: (field: keyof Item) => (value: any) => {
            if (value && typeof value === 'object' && 'value' in value) {
                onChange(index, field, value.value);
            } else if (typeof value === 'string') {
                onChange(index, field, value);
            } else {
                onChange(index, field, '');
            }
        },

        handleCode: (value: any, currentCustomerName?: string) => {
            const code = typeof value === "object" && value?.value
                ? value.value
                : typeof value === "string"
                    ? value
                    : "";

            onChange(index, "customerCode", code);

            // Очищаем имя клиента только если оно было заполнено
            if (currentCustomerName) {
                onChange(index, "customerName", "");
            }
        },

        handleProductRoutes: (value: any) => {
            const routes = typeof value === "object" && value?.value
                ? value.value
                : typeof value === "string"
                    ? value
                    : "";

            onChange(index, "productRoutes", routes);
        },

        handleCurrency: (value: any) => {
            const currency = typeof value === "object" && value?.value
                ? value.value
                : typeof value === "string"
                    ? value
                    : "";

            onChange(index, "currency", currency);
        }
    }), [index, onChange]);

    // Возвращаем стабильные колбэки
    return {
        handleInput: useCallback(handlers.handleInput, [handlers.handleInput]),
        handleSelectChange: useCallback(handlers.handleSelectChange, [handlers.handleSelectChange]),
        handleCode: useCallback(handlers.handleCode, [handlers.handleCode]),
        handleProductRoutes: useCallback(handlers.handleProductRoutes, [handlers.handleProductRoutes]),
        handleCurrency: useCallback(handlers.handleCurrency, [handlers.handleCurrency])
    };
};