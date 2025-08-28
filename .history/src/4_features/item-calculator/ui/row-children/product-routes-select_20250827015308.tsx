import React, { useMemo, useCallback } from "react";
import { SelectAsync, SelectOption } from "6_shared/ui";

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

export const ProductRoutesSelect = React.memo<ProductRoutesSelectProps>(({
    value, onChange, error, index, label, loadingData, placeholder, keyProps
}) => {
    // Мемоизируем выбранное значение
    const selectedValue = useMemo(() =>
        value ? { value, label: value } : null,
        [value]
    );

    // Стабильный ключ
    const stableKey = useMemo(() => `${keyProps}-${index}`, [keyProps, index]);

    return (
        <SelectAsync
            label={label}
            key={stableKey}
            loadOptions={loadingData}
            value={selectedValue}
            onChange={onChange}
            errors={error}
            placeholder={placeholder}
            showError={false}
        />
    );
});