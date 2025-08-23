import { SelectAsync } from "6_shared/ui"
import { useProductRoutesLoader } from "4_features/item-calculator"

interface ProductRoutesSelectProps {
    value?: string;
    onChange?: (value: any) => void;
    error?: string;
    index: number;
}

export const ProductRoutesSelect = ({ value, onChange, error, index }: ProductRoutesSelectProps) => {
    const loadProductRoutes = useProductRoutesLoader();

    const selectedValue = value ? { value, label: value } : null;

    return <SelectAsync
        key={`product-routes-${index}`}
        loadOptions={loadProductRoutes}
        value={selectedValue}
        onChange={onChange}
        errors={error}
        placeholder="Выберите направление"
        showError={false} />
}