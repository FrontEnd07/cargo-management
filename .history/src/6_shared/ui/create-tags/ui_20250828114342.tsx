"use client";

import { useState } from "react";
import CreatableSelect from "react-select/creatable";

export const CreateTags = ({ tags = [], onUpdate = () => { } }) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (value, actionMeta) => {
        console.groupEnd();
        onUpdate(value);
    };

    const handleInputChange = (val) => {
        setInputValue(val);
    };

    return (
        <div></div>
    )
}