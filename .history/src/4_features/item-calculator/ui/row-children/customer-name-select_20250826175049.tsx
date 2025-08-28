import React, { memo, useMemo, useCallback } from "react";
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

export const CustomerNameSelect = memo<CustomerNameSelectProps>(({
    value,
    code,
    onChange,
    error,
    index,
    label
}) => {
    const loadCustomerNames = useCustomerNameLoader();

    // Мемоизируем функцию загрузки опций
    const loadOptions = useCallback(async () => {
        if (!code) return [];
        try {
            const names = await loadCustomerNames(code);
            return Array.from(new Map(names.map(n => [n.value, n])).values());
        } catch {
            return [];
        }
    }, [code, loadCustomerNames]);

    // Мемоизируем selectedValue
    const selectedValue = useMemo(() =>
        value ? { value, label: value } : null,
        [value]
    );

    // Мемоизируем ключ и плейсхолдер
    const componentKey = useMemo(() =>
        `customer-name-${index}-${code || "no-code"}`,
        [index, code]
    );

    const placeholder = useMemo(() =>
        code ? "Выберите имя клиента" : "Сначала выберите код",
        [code]
    );

    return (
        <SelectAsync
            key={componentKey}
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

CustomerNameSelect.displayName = "CustomerNameSelect";