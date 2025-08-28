import { useCallback, useMemo } from "react";
import { Item } from "5_entities/receive-products";

export const useItemRowHandlers = (
    index: number,
    item: Item,
    onChange: (index: number, field: keyof Item, value: string) => void
) => {
    // Мемоизируем базовую функцию onChange для текущего индекса
    const memoizedOnChange = useCallback((field: keyof Item, value: string) => {
        onChange(index, field, value);
    }, [index, onChange]);

    const handleInput = useCallback(
        (field: keyof Item, value: string) => {
            memoizedOnChange(field, value);
        },
        [memoizedOnChange]
    );

    const handleSelectChange = useCallback(
        (field: keyof Item) => (value: any) => {
            const finalValue = value?.value || (typeof value === 'string' ? value : '');
            memoizedOnChange(field, finalValue);
        },
        [memoizedOnChange]
    );

    const handleCode = useCallback(
        (value: any) => {
            const code = value?.value || (typeof value === "string" ? value : "");
            memoizedOnChange("customerCode", code);

            // Очищаем имя клиента только если оно было заполнено
            if (item.customerName) {
                memoizedOnChange("customerName", "");
            }
        },
        [memoizedOnChange, item.customerName]
    );

    const handleProductRoutes = useCallback(
        (value: any) => {
            const routes = value?.value || (typeof value === "string" ? value : "");
            memoizedOnChange("productRoutes", routes);
        },
        [memoizedOnChange]
    );

    const handleCurrency = useCallback(
        (value: any) => {
            const currency = value?.value || (typeof value === "string" ? value : "");
            memoizedOnChange("currency", currency);
        },
        [memoizedOnChange]
    );

    // Возвращаем мемоизированный объект
    return useMemo(() => ({
        handleInput,
        handleSelectChange,
        handleCode,
        handleProductRoutes,
        handleCurrency
    }), [handleInput, handleSelectChange, handleCode, handleProductRoutes, handleCurrency]);
};