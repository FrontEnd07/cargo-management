import { useCallback } from "react";
import { Item } from "5_entities/receive-products";

export const useItemRowHandlers = (
    index: number,
    item: Item,
    onChange: (index: number, field: keyof Item, value: string) => void
) => {
    const handleInput = useCallback(
        (field: keyof Item, value: string) => {
            onChange(index, field, value);
        },
        [index, onChange]
    );

    const handleSelectChange = useCallback(
        (field: keyof Item) => (value: any) => {
            if (value && typeof value === 'object' && 'value' in value) {
                onChange(index, field, value.value);
            } else if (typeof value === 'string') {
                onChange(index, field, value);
            } else {
                onChange(index, field, '');
            }
        },
        [index, onChange]
    );

    const handleCode = useCallback(
        (value: any) => {
            const code = typeof value === "object" && value?.value
                ? value.value
                : typeof value === "string"
                    ? value
                    : "";

            onChange(index, "customerCode", code);

            if (item.customerName) {
                onChange(index, "customerName", "");
            }
        },
        [index, item.customerName, onChange]
    );

    const handleProductRoutes = useCallback(
        (value: any) => {

            const routes = typeof value === "object" && value?.value
                ? value.value
                : typeof value === "string"
                    ? value
                    : "";

            onChange(index, "productRoutes", routes);
        },
        [index, item.productRoutes, onChange]
    );

    return { handleInput, handleSelectChange, handleCode, handleProductRoutes };
};
