import { SelectAsync } from "6_shared/ui";
import { useCustomerCodeLoader } from "4_features/item-calculator";

interface CustomerCodeSelectProps {
    value?: string;
    onChange: (value: any) => void;
    error?: string;
    index: number;
    label?: string;
}

export const CustomerCodeSelect = ({ value, onChange, error, index, label }: CustomerCodeSelectProps) => {
    const loadCustomerCodes = useCustomerCodeLoader();

    const selectedValue = value ? { value, label: value } : null;

    return (
        <SelectAsync
            label={label}
            key={`customer-code-${index}`}
            value={selectedValue}
            onChange={onChange}
            loadOptions={loadCustomerCodes}
            errors={error}
            placeholder="Выберите код клиента"
            showError={false}
        />
    );
};
