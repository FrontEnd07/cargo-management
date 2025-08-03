import { InputHTMLAttributes } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    errors?: string;
    label: string;
    id: string;
    className?: string;
}