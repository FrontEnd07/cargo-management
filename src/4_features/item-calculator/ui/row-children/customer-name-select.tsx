import { SelectAsync } from "6_shared/ui";
import { useCustomerNameLoader } from "4_features/item-calculator";

interface CustomerNameSelectProps {
    value?: string;
    code?: string;
    onChange: any;
    error?: string;
    index: number;
}

export const CustomerNameSelect = ({ value, code, onChange, error, index }: CustomerNameSelectProps) => {
    const loadCustomerNames = useCustomerNameLoader();

    const loadOptions = async () => {
        if (!code) return [];
        try {
            const names = await loadCustomerNames(code);
            return Array.from(new Map(names.map(n => [n.value, n])).values());
        } catch {
            return [];
        }
    };

    const selectedValue = value ? { value, label: value } : null;

    return (
        <SelectAsync
            key={`customer-name-${index}-${code || "no-code"}`}
            value={selectedValue}
            onChange={onChange('customerName')}
            loadOptions={loadOptions}
            errors={error}
            placeholder={code ? "Выберите имя клиента" : "Сначала выберите код"}
            isDisabled={!code}
            showError={false}
        />
    );
};

