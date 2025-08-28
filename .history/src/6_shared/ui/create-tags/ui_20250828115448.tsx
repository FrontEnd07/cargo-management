"use client";

import React, { SetStateAction, useState, KeyboardEventHandler } from "react";
import CreatableSelect from "react-select/creatable";

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

export const CreateTags = () => {
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

    return (
        <div>
            <CreatableSelect
                components={components}
                inputValue={inputValue}
                isClearable
                isMulti
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