import { Input } from "6_shared/ui";
import { Item, ValidationErrors } from "5_entities/receive-products";

interface EditableCellProps {
    field: keyof Item;
    item: Item;
    onChange: (field: keyof Item, value: string) => void;
    errors?: ValidationErrors;
    type?: string;
    step?: string;
}

export const EditableCell = ({ field, item, onChange, errors, type = "text", step }: EditableCellProps) => (
    <Input
        type={type}
        step={step}
        value={item[field] || ""}
        onChange={e => onChange(field, e.target.value)}
        className="max-w-[90px] min-w-[60px]"
        errors={errors?.[field]}
        showError={false}
    />
);
