"use client";

import { SetStateAction, useState } from "react";
import CreatableSelect from "react-select/creatable";

const componentsWithAllDisabled = {
    DropdownIndicator: null
};

export const CreateTags = ({ tags = [], onUpdate = () => { } }) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (value: any, actionMeta: any) => {
        console.groupEnd();
        console.log('value', value)
        console.log('actionMeta', actionMeta)
    };

    const handleInputChange = (val: SetStateAction<string>) => {
        setInputValue(val);
    };

    const handleKeyDown = (event) => {
        if (!inputValue) return;
        if (event.key === "Enter" || event.key === "Tab") {
            // console.group("Value Added");
            // console.log(tags);
            // console.groupEnd();
            setInputValue("");
            let newTags = [...tags, createOption(inputValue)];
            onUpdate(newTags);
            event.preventDefault();
        }
    };

    return (
        <div>
            <CreatableSelect
                components={componentsWithAllDisabled}
                inputValue={inputValue}
                isClearable={false}
                menuIsOpen={false}
                isMulti
                onChange={handleChange}
                onInputChange={handleInputChange}
                //onKeyDown={handleKeyDown}
                placeholder="Введите что-нибудь и нажмите Enter..."
                value={tags}
            />
        </div>
    )
}