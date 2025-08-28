import React, { memo, useMemo } from "react";
import { SelectAsync } from "6_shared/ui";
import { useCustomerCodeLoader } from "4_features/item-calculator";

interface CustomerCodeSelectProps {
    value?: string;
    onChange: (value: any) => void;
    error?: string;
    index: number;
    label?: string;
}

export const CustomerCodeSelect = memo<CustomerCodeSelectProps>(({
    value,
    onChange,
    error,
    index,
    label
}) => {
    const loadCustomerCodes = useCustomerCodeLoader();

    // Мемоизируем selectedValue
    const selectedValue = useMemo(() =>
        value ? { value, label: value } : null,
        [value]
    );

    // Мемоизируем ключ для предотвращения пересоздания компонента
    const componentKey = useMemo(() => `customer-code-${index}`, [index]);

    return (
        <SelectAsync
            label={label}
            key={componentKey}
            value={selectedValue}
            onChange={onChange}
            loadOptions={loadCustomerCodes}
            errors={error}
            placeholder="Выберите код клиента"
            showError={false}
        />
    );
});

CustomerCodeSelect.displayName = "CustomerCodeSelect";