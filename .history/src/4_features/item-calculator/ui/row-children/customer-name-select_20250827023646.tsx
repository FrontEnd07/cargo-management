import { SelectAsync } from "6_shared/ui";
import { useCustomerNameLoader } from "4_features/item-calculator";
import { useCallback, useMemo } from "react";

interface CustomerNameSelectProps {
    value?: string;
    code?: string;
    onChange: any;
    error?: string;
    index: number;
    label?: string;
}

export const CustomerNameSelect = ({ value, code, onChange, error, index, label }: CustomerNameSelectProps) => {
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

    // Мемоизируем selectedValue
    const selectedValue = useMemo(() =>
        value ? { value, label: value } : null,
        [value]
    );

    // Мемоизируем onChange handler
    const handleChange = useCallback((newValue: any) => {
        onChange('customerName')(newValue);
    }, [onChange]);

    return (
        <SelectAsync
            // Убираем code из key, оставляем только index
            key={`customer-name-${index}`}
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
};