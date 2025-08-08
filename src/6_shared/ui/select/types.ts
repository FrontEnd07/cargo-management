import type { GroupBase, OptionsOrGroups, SingleValue } from 'react-select';

export interface SearchSelectProps<OptionType> {
    loadOptions: (
        inputValue: string
    ) => Promise<OptionsOrGroups<OptionType, GroupBase<OptionType>>>;
    onChange: (newValue: SingleValue<OptionType>) => void;
    placeholder?: string;
    noOptionsMessage?: string;
    loadingMessage?: string;
    className?: string;
    isClearable?: boolean;
    isSearchable?: boolean;
}
