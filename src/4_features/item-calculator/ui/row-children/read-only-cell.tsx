import { Input } from "6_shared/ui";
import { INPUT_CLASSES } from "5_entities/receive-products";

interface ReadOnlyCellProps {
    value: string;
    placeholder: string;
}

export const ReadOnlyCell = ({ value, placeholder }: ReadOnlyCellProps) => (
    <Input
        readOnly
        value={value || "0"}
        placeholder={placeholder}
        className={`${INPUT_CLASSES} bg-gray-100 text-center max-w-[90px]`}
        showError={false}
    />
);
