
export interface SelectOption {
    label: string
    value: string
}

export interface AsyncSelectCurrencyProps {
    loadOptions: (inputValue: string) => Promise<SelectOption[]>
    onChange?: (option: SelectOption | SelectOption[] | null) => void
    isMulti?: boolean
    value?: SelectOption | SelectOption[] | null
    placeholder?: string;
    errors?: string;
    id?: string;
    label?: string;
    isDisabled?: boolean;
    showError?: boolean;
}