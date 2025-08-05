import { Input } from "6_shared/ui";

export const Filter = () => {
    return <div className="pb-4 dark:bg-gray-900">
        <div className="flex items-center">
            <Input name="customerName" label="Поиск" placeholder="Имя, телефон, адрес, код" id="search" className="bg-white" />
        </div>
    </div>
}