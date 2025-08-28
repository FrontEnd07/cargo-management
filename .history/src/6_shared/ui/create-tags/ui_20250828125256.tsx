"use client";

import { useState, KeyboardEventHandler } from "react";
import CreatableSelect from "react-select/creatable";
import type { ClassNamesConfig, GroupBase } from "react-select"

const components = {
    DropdownIndicator: null,
};

interface Option {
    readonly label: string;
    readonly value: string;
}

const createOption = (label: string): Option => ({
    label,
    value: label,
});

interface CreateTagsProps {
    label?: string;
    id?: string;
    errors?: string;
    value?: readonly Option[];
    onChange?: (value: readonly Option[]) => void;
}

export const CreateTags = ({
    label,
    id,
    errors,
    value,
    onChange,
    ...props
}: CreateTagsProps) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;

        switch (event.key) {
            case "Enter":
            case "Tab":
                // Проверяем, существует ли уже такой тег
                const newValue = createOption(inputValue);
                const newValues = value ? [...value, newValue] : [newValue];

                // Проверяем на дубликаты
                if (!value?.some((option) => option.value === inputValue)) {
                    onChange?.(newValues);
                }
                setInputValue("");
                event.preventDefault();
        }
    };

    const getControlClass = (state: any) => `
        whitespace-nowrap 
        dark:!bg-gray-800 
        !cursor-pointer 
        !appearance-none 
        !border 
        ${state.isFocused
            ? 'border-blue-500 !border-blue-500'
            : errors
                ? 'border-red-300 dark:border-red-500'
                : 'border-gray-300 dark:border-gray-600'
        }
        !shadow-none 
        dark:!border-gray-600
        rounded-lg
    `

    const getOptionClass = (state: any) => {
        if (state.isSelected) {
            return 'dark:!bg-slate-300/30'
        }
        if (state.isFocused) {
            return state.isSelected
                ? 'dark:!bg-slate-300/30'
                : 'bg-gray-50 dark:!bg-slate-300/10 !cursor-pointer'
        }
        return 'text-gray-900 dark:text-gray-300'
    }

    const tegsClassNames: ClassNamesConfig<Option, true, GroupBase<Option>> = {
        control: getControlClass,
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
            rounded
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
            rounded-r
        `,
        indicatorsContainer: () => `
            !p-0
        `
    }

    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                    {label}
                </label>
            )}

            <CreatableSelect
                id={id}
                {...props}
                components={components}
                inputValue={inputValue}
                isClearable
                classNames={tegsClassNames}
                isMulti
                menuIsOpen={false}
                onChange={(newValue) => onChange?.(newValue as readonly Option[])}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                placeholder="Введите что-нибудь и нажмите Enter..."
                value={value || []}
            />
        </div>
    )
}