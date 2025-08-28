import { useCallback, useRef } from "react";
import { Item } from "5_entities/receive-products";

export const useItemRowHandlers = (
    index: number,
    item: Item,
    onChange: (index: number, field: keyof Item, value: string) => void
) => {
    // Используем ref для хранения актуального состояния item без ререндеров
    const itemRef = useRef(item);
    itemRef.current = item;

    const handleInput = useCallback(
        (field: keyof Item) => (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(index, field, e.target.value);
        },
        [index, onChange]
    );

    const handleSelectChange = useCallback(
        (field: keyof Item) => (value: any) => {
            let stringValue = '';

            if (value && typeof value === 'object' && 'value' in value) {
                stringValue = value.value;
            } else if (typeof value === 'string') {
                stringValue = value;
            }

            onChange(index, field, stringValue);
        },
        [index, onChange]
    );

    const handleCode = useCallback(
        (value: any) => {
            let code = '';

            if (typeof value === "object" && value?.value) {
                code = value.value;
            } else if (typeof value === "string") {
                code = value;
            }

            onChange(index, "customerCode", code);

            // Используем ref для проверки текущего состояния без добавления зависимости
            if (itemRef.current.customerName) {
                onChange(index, "customerName", "");
            }
        },
        [index, onChange] // Убираем item.customerName из зависимостей
    );

    const handleProductRoutes = useCallback(
        (value: any) => {
            let routes = '';

            if (typeof value === "object" && value?.value) {
                routes = value.value;
            } else if (typeof value === "string") {
                routes = value;
            }

            onChange(index, "productRoutes", routes);
        },
        [index, onChange] // Убираем item.productRoutes из зависимостей
    );

    const handleCurrency = useCallback(
        (value: any) => {
            let currency = '';

            if (typeof value === "object" && value?.value) {
                currency = value.value;
            } else if (typeof value === "string") {
                currency = value;
            }

            onChange(index, "currency", currency);
        },
        [index, onChange] // Убираем item.currency из зависимостей
    );

    return {
        handleInput,
        handleSelectChange,
        handleCode,
        handleProductRoutes,
        handleCurrency
    };
};