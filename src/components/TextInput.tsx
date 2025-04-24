import React from "react";

type Props = {
    placeholder: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
};

const TextInput = (props: Props) => {
    return (
        <input
            className="border border-gray-300 px-3 py-2 rounded-lg w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-white"
            type="text"
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    );
};

export default TextInput;
