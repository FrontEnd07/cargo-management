import clsx from "clsx";
import { Icon } from '6_shared/ui'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) => {
    const baseClasses = 'cursor-pointer duration-200 shadow-md font-medium rounded-md outline-none'

    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 text-gray-900',
        danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white'
    }

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    }

    return (
        <button
            className={`${clsx(
                sizeClasses[size],
                variantClasses[variant],
                baseClasses,
                className,
                {
                    ['opacity-75']: isLoading
                }
            )}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center">
                    <Icon className="animate-spin ml-1 mr-2 h-5 w-5 text-white ease-in-out" name="common/spinner" />
                    Загрузка...
                </div>
            ) : (
                children
            )}
        </button>
    )
}