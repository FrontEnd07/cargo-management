import { SelectAsync } from "6_shared/ui"
import { SelectOption } from "6_shared/ui"

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

export const ProductRoutesSelect = ({ value, onChange, error, index, label, loadingData, placeholder, keyProps }: ProductRoutesSelectProps) => {
    const selectedValue = value ? { value, label: value } : null;

    return <SelectAsync
        label={label}
        key={`${keyProps}-${index}`}
        loadOptions={loadingData}
        value={selectedValue}
        onChange={onChange}
        errors={error}
        placeholder={placeholder}
        showError={false} />
}