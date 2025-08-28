"use client";

import { useState, KeyboardEventHandler } from "react";
import CreatableSelect from "react-select/creatable";
import type { ClassNamesConfig, GroupBase } from "react-select"
import { classNames } from "6_shared/styles";

const components = {
    DropdownIndicator: null,
};

interface Option {
    readonly label: string;
    readonly value: string;
}

const createOption = (label: string) => ({
    label,
    value: label,
});

interface createTags {
    label?: string;
    id?: string;
    errors?: string;
}

export const CreateTags = ({ label, id, errors }: createTags) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [value, setValue] = useState<readonly Option[]>([]);

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;

        switch (event.key) {
            case "Enter":
            case "Tab":
                // Проверяем, существует ли уже такой тег
                if (!value.some((option) => option.value === inputValue)) {
                    setValue((prev) => [...prev, createOption(inputValue)]);
                }
                setInputValue("");
                event.preventDefault();
        }
    };

    const tegsClassNames = classNames(errors ? true : false);

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
                components={components}
                inputValue={inputValue}
                isClearable
                isMulti={true}
                classNames={tegsClassNames}
                menuIsOpen={false}
                onChange={(newValue) => setValue(newValue as readonly Option[])}
                onInputChange={(newValue) => setInputValue(newValue)}
                onKeyDown={handleKeyDown}
                placeholder="Введите что-нибудь и нажмите Enter..."
                value={value}
            />
        </div>
    )
}