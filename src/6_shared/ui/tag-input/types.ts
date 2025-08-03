import type { Path, Control, FieldValues } from "react-hook-form";

export interface TagInputProps<TFieldValue extends FieldValues> {
    name: Path<TFieldValue>;
    control?: Control<TFieldValue>;
    label: string;
    errors: string;
    placeholder?: string;
    className?: string;
    maxTags?: number;
}