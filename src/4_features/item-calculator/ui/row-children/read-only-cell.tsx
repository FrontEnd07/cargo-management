import { Input } from "6_shared/ui";
import { INPUT_CLASSES } from "5_entities/receive-products";

interface ReadOnlyCellProps {
    value: string;
    placeholder: string;
    label?: string;
}

export const ReadOnlyCell = ({ value, placeholder, label }: ReadOnlyCellProps) => (
    <Input
        readOnly
        value={value || "0"}
        label={label}
        placeholder={placeholder}
        className={`${INPUT_CLASSES} bg-gray-100 text-center`}
        showError={false}
    />
);
