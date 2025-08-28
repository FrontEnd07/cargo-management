"use client";

import { SetStateAction, useState } from "react";
import CreatableSelect from "react-select/creatable";

export const CreateTags = ({ tags = [], onUpdate = () => { } }) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (value, actionMeta) => {
        console.groupEnd();
        onUpdate(value);
    };

    const handleInputChange = (val: SetStateAction<string>) => {
        setInputValue(val);
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
                onKeyDown={handleKeyDown}
                placeholder="Type something and press enter..."
                value={tags}
            />
        </div>
    )
}