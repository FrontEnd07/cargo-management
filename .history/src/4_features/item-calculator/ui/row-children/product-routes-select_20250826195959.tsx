import React, { memo } from "react";
import { SelectAsync } from "6_shared/ui";
import { SelectOption } from "6_shared/ui";

interface ProductRoutesSelectProps {
    value?: string;
    onChange?: (value: any) => void;
    error?: string;
    label?: string;
    loadingData: (inputValue: string) => Promise<SelectOption[]>;
    placeholder?: string;
}

export const ProductRoutesSelect = memo<ProductRoutesSelectProps>(({
    value,
    onChange,
    error,
    label,
    loadingData,
    placeholder
}) => {
    // Простое вычисление без useMemo
    const selectedValue = value ? { value, label: value } : null;

    return (
        <SelectAsync
            label={label}
            loadOptions={loadingData}
            value={selectedValue}
            onChange={onChange}
            errors={error}
            placeholder={placeholder}
            showError={false}
        />
    );
});

// Добавляем правильное сравнение для memo
export const MemoizedProductRoutesSelect = memo(ProductRoutesSelect, (prevProps, nextProps) => {
    return (
        prevProps.value === nextProps.value &&
        prevProps.error === nextProps.error &&
        prevProps.label === nextProps.label &&
        prevProps.loadingData === nextProps.loadingData &&
        prevProps.placeholder === nextProps.placeholder
    );
});