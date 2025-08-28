import type { ClassNamesConfig, GroupBase } from "react-select";

// Функция для генерации классов control
const getControlClass = (errors?: boolean) => () => `
    whitespace-nowrap 
    dark:!bg-gray-800 
    ${errors ? '!border-red-300 dark:!border-red-500' : '!border-gray-300'} 
    !cursor-pointer 
    !appearance-none 
    !border 
    focus:!border-blue-500 
    !shadow-none 
    dark:!border-gray-600
`;

// Функция для генерации классов option
const getOptionClass = (state: any) => {
    if (state.isSelected) {
        return 'dark:!bg-slate-300/30';
    }
    if (state.isFocused) {
        return state.isSelected
            ? 'dark:!bg-slate-300/30'
            : 'bg-gray-50 dark:!bg-slate-300/10 !cursor-pointer';
    }
    return 'text-gray-900 dark:text-gray-300';
};

// Основной конфиг для classNames
export const classNames = (
    errors?: boolean
): ClassNamesConfig => ({
    control: getControlClass(errors),
    placeholder: () => `
        min-w-[80px] 
        dark:!text-gray-400 
        !text-gray-500
    `,
    menu: () => `
        z-33 
        rounded-xl 
        !ring-gray-950/5 
        !shadow-xl 
        dark:!bg-slate-900 
        dark:!border-gray-700 
        !border-gray-950/5 
        !border
    `,
    option: getOptionClass,
    input: () => `dark:!text-white`,
    multiValue: () => `
        !bg-gray-100 
        dark:!bg-gray-700 
        !mr-1
    `,
    indicatorSeparator: () => `dark:!bg-gray-600`,
    singleValue: () => `
        min-w-[80px] 
        dark:!text-gray-400
    `,
    multiValueLabel: () => `
        !text-gray-800 
        dark:!text-gray-200 
        !text-sm
    `,
    multiValueRemove: () => `
        dark:hover:!bg-gray-400 
        !text-gray-500 
        hover:!text-gray-700 
        dark:!text-gray-400 
        dark:hover:!text-gray-200 
        !cursor-pointer
    `,
    indicatorsContainer: () => `
        !p-0
    `,
});