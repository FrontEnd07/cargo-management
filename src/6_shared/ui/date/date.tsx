import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import clsx from "clsx";

interface DataProps {
    name: string;
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    label: string;
    className?: string;
    onChange: (dateStr: string) => void;
}

export const Date = ({
    className,
    defaultValue,
    placeholder,
    value,
    name,
    label,
    onChange,
    ...props
}: DataProps) => {

    const handleChange = (selectedDates: Date[], dateStr: string, instance: any) => {
        onChange(dateStr);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300" htmlFor={name}>{label}</label>
            <Flatpickr
                id={name}
                {...props}
                className={`${clsx(className)} 
    appearance-none relative block w-full px-3 py-2 border border-gray-300
    placeholder-gray-500 text-gray-900 rounded-md focus:outline-none 
    focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-colors
    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
    dark:bg-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder={placeholder}
                options={{
                    defaultDate: defaultValue,
                }}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}