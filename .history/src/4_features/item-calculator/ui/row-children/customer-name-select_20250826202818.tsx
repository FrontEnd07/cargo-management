import React, { memo, useMemo, useCallback } from "react";
import { SelectAsync } from "6_shared/ui";
import { useCustomerNameLoader } from "4_features/item-calculator";

interface CustomerNameSelectProps {
    value?: string;
    code?: string;
    onChange: (field: string) => (value: any) => void;
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
    const loadOptions = useCallback(async () => {
        if (!code) return [];
        try {
            const names = await loadCustomerNames(code);
            return Array.from(new Map(names.map(n => [n.value, n])).values());
        } catch {
            return [];
        }
    }, [code, loadCustomerNames]); // ✅ Зависимости правильные

    // ✅ Простое вычисление без useMemo
    const selectedValue = value ? { value, label: value } : null;

    // ✅ Простое вычисление без useMemo
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

// ✅ Добавляем правильное сравнение для memo
export const MemoizedCustomerNameSelect = memo(CustomerNameSelect, (prevProps, nextProps) => {
    return (
        prevProps.value === nextProps.value &&
        prevProps.code === nextProps.code &&
        prevProps.error === nextProps.error &&
        prevProps.label === nextProps.label
    );
});

CustomerNameSelect.displayName = "CustomerNameSelect";