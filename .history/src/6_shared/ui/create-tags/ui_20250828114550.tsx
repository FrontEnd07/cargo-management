"use client";

import { SetStateAction, useState } from "react";
import CreatableSelect from "react-select/creatable";

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

    return (
        <div>
            <CreatableSelect
                //components={componentsWithAllDisabled}
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