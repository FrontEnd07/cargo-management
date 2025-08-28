import React, { memo, useMemo } from "react";
import { SelectAsync } from "6_shared/ui";
import { SelectOption } from "6_shared/ui";

interface ProductRoutesSelectProps {
    value?: string;
    onChange?: (value: any) => void;
    error?: string;
    index: number;
    label?: string;
    loadingData: (inputValue: string) => Promise<SelectOption[]>;
    placeholder?: string;
    keyProps: string;
}

export const ProductRoutesSelect = memo<ProductRoutesSelectProps>(({
    value,
    onChange,
    error,
    index,
    label,
    loadingData,
    placeholder,
    keyProps
}) => {
    // Мемоизируем selectedValue
    const selectedValue = useMemo(() =>
        value ? { value, label: value } : null,
        [value]
    );

    // Мемоизируем ключ
    const componentKey = useMemo(() =>
        `${keyProps}-${index}`,
        [keyProps, index]
    );

    return (
        <SelectAsync
            label={label}
            key={componentKey}
            loadOptions={loadingData}
            value={selectedValue}
            onChange={onChange}
            errors={error}
            placeholder={placeholder}
            showError={false}
        />
    );
});

ProductRoutesSelect.displayName = "ProductRoutesSelect";