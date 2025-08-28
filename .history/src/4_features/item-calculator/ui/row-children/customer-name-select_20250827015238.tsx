import React, { useMemo, useCallback } from "react";
import { SelectAsync } from "6_shared/ui";
import { useCustomerNameLoader } from "4_features/item-calculator";

interface CustomerNameSelectProps {
    value?: string;
    code?: string;
    onChange: any;
    error?: string;
    index: number;
    label?: string;
}

export const CustomerNameSelect = React.memo<CustomerNameSelectProps>(({
    value, code, onChange, error, index, label
}) => {
    const loadCustomerNames = useCustomerNameLoader();

    // Мемоизируем функцию загрузки
    const loadOptions = useCallback(async () => {
        if (!code) return [];
        try {
            const names = await loadCustomerNames(code);
            return Array.from(new Map(names.map(n => [n.value, n])).values());
        } catch {
            return [];
        }
    }, [code, loadCustomerNames]);

    // Мемоизируем выбранное значение
    const selectedValue = useMemo(() =>
        value ? { value, label: value } : null,
        [value]
    );

    // Мемоизируем обработчик изменения
    const handleChange = useCallback((newValue: any) => {
        onChange('customerName')(newValue);
    }, [onChange]);

    return (
        <SelectAsync
            key={`customer-name-${index}-${code || "no-code"}`}
            label={label}
            value={selectedValue}
            onChange={handleChange}
            loadOptions={loadOptions}
            errors={error}
            placeholder={code ? "Выберите имя клиента" : "Сначала выберите код"}
            isDisabled={!code}
            showError={false}
        />
    );
});