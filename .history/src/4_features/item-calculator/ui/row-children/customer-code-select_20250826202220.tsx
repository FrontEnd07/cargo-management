import React, { memo } from "react";
import { SelectAsync } from "6_shared/ui";
import { useCustomerCodeLoader } from "4_features/item-calculator";

interface CustomerCodeSelectProps {
    value?: string;
    onChange: (value: any) => void;
    error?: string;
    label?: string;
    placeholder?: string;
}

export const CustomerCodeSelect = memo<CustomerCodeSelectProps>(({
    value,
    onChange,
    error,
    label,
    placeholder = "Выберите код клиента"
}) => {
    const loadCustomerCodes = useCustomerCodeLoader();

    // ✅ Простое вычисление без useMemo
    const selectedValue = value ? { value, label: value } : null;

    return (
        <SelectAsync
            label={label}
            value={selectedValue}
            onChange={onChange}
            loadOptions={loadCustomerCodes}
            errors={error}
            placeholder={placeholder}
            showError={false}
        />
    );
});

// ✅ Добавляем правильное сравнение для memo
export const MemoizedCustomerCodeSelect = memo(CustomerCodeSelect, (prevProps, nextProps) => {
    return (
        prevProps.value === nextProps.value &&
        prevProps.error === nextProps.error &&
        prevProps.label === nextProps.label &&
        prevProps.placeholder === nextProps.placeholder &&
        prevProps.loadCustomerCodes === nextProps.loadCustomerCodes
    );
});