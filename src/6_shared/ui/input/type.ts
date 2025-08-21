import { InputHTMLAttributes } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    errors?: string;
    label?: string;
    id?: string;
    showError?: boolean;
    value?: string | number;
    onClear?: (event?: any) => void;
    className?: string;
}