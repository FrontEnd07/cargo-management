import { useCallback } from "react";
import { Item } from "5_entities/receive-products";

export const useItemRowHandlers = (
    index: number,
    onChange: (index: number, field: keyof Item, value: string) => void
) => {
    // ✅ Все обработчики стабильны
    const handleInput = useCallback((field: keyof Item, value: string) => {
        onChange(index, field, value);
    }, [index, onChange]);

    const handleSelectChange = useCallback((field: keyof Item) => (value: any) => {
        if (value && typeof value === 'object' && 'value' in value) {
            onChange(index, field, value.value);
        } else if (typeof value === 'string') {
            onChange(index, field, value);
        } else {
            onChange(index, field, '');
        }
    }, [index, onChange]);

    const handleCode = useCallback((value: any, currentCustomerName?: string) => {
        const code = typeof value === "object" && value?.value
            ? value.value
            : typeof value === "string"
                ? value
                : "";

        onChange(index, "customerCode", code);

        if (currentCustomerName) {
            onChange(index, "customerName", "");
        }
    }, [index, onChange]);

    const handleProductRoutes = useCallback((value: any) => {
        const routes = typeof value === "object" && value?.value
            ? value.value
            : typeof value === "string"
                ? value
                : "";

        onChange(index, "productRoutes", routes);
    }, [index, onChange]);

    const handleCurrency = useCallback((value: any) => {
        const currency = typeof value === "object" && value?.value
            ? value.value
            : typeof value === "string"
                ? value
                : "";

        onChange(index, "currency", currency);
    }, [index, onChange]);

    return {
        handleInput,
        handleSelectChange,
        handleCode,
        handleProductRoutes,
        handleCurrency
    };
};