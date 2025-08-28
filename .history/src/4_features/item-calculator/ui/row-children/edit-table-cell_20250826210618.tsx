import { Input } from "6_shared/ui";
import { Item, ValidationErrors } from "5_entities/receive-products";

interface EditableCellProps {
    field: keyof Item;
    item: Item;
    onChange: (field: keyof Item, value: string) => void;
    errors?: ValidationErrors;
    type?: string;
    label?: string;
    step?: string;
}

export const EditableCell = memo(({ field, item, onChange, errors, type = "text", step, label }: EditableCellProps) => (
    <Input
        type={type}
        step={step}
        label={label}
        value={item[field] || ""}
        onChange={e => onChange(field, e.target.value)}
        errors={errors?.[field]}
        showError={false}
    />
}, (prev, next) => {
    return (
        prev.field === next.field &&
        prev.item === next.item &&
        prev.onChange === next.onChange &&
        prev.errors === next.errors &&
        prev.type === next.type &&
        prev.step === next.step &&
        prev.label === next.label
    );
});
