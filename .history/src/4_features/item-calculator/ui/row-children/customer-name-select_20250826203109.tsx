import React, { memo } from "react";
import { SelectAsync } from "6_shared/ui";
import { useCustomerNameLoader } from "4_features/item-calculator";
import { Item } from "5_entities/receive-products";

interface CustomerNameSelectProps {
    value?: string;
    code?: string;
    onChange: (field: keyof Item) => (value: any) => void;
    error?: string;
    label?: string;
}

export const CustomerNameSelect = memo<CustomerNameSelectProps>(({
    value,
    code,
    onChange,
    error,
    label
}) => {
    const loadCustomerNames = useCustomerNameLoader();

    // ✅ Стабильная функция загрузки опций
    const loadOptions = React.useCallback(async () => {
        if (!code) return [];
        try {
            const names = await loadCustomerNames(code);
            return Array.from(new Map(names.map(n => [n.value, n])).values());
        } catch {
            return [];
        }
    }, [code, loadCustomerNames]);

    // ✅ Простое вычисление
    const selectedValue = value ? { value, label: value } : null;
    const placeholder = code ? "Выберите имя клиента" : "Сначала выберите код";

    return (
        <SelectAsync
            label={label}
            value={selectedValue}
            onChange={onChange('customerName')}
            loadOptions={loadOptions}
            errors={error}
            placeholder={placeholder}
            isDisabled={!code}
            showError={false}
        />
    );
});

// ✅ Правильная мемоизация
export const MemoizedCustomerNameSelect = memo(CustomerNameSelect, (prevProps, nextProps) => {
    return (
        prevProps.value === nextProps.value &&
        prevProps.code === nextProps.code &&
        prevProps.error === nextProps.error &&
        prevProps.label === nextProps.label
    );
});

CustomerNameSelect.displayName = "CustomerNameSelect";