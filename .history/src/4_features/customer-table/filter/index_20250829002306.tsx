import { Input, DatePicker, Button } from "6_shared/ui";
import { useFilterParams } from "./lib";
import { ChangeEvent, useCallback } from "react";

export const Filter = () => {
    const {
        searchValue,
        dateValue,
        setSearchValue,
        setDateValue,
        handleClearSearch,
        handleClearDate,
        handleClearAll,
    } = useFilterParams();

    // Мемоизируем обработчики для оптимизации
    const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }, [setSearchValue]);

    const handleDateChange = useCallback((dateStr: string) => {
        setDateValue(dateStr);
    }, [setDateValue]);

    return <div className="pb-4 dark:bg-gray-900">
        <div className="flex items-end">
            <div className="mr-3">
                <Input
                    name="customerName"
                    label="Поиск"
                    placeholder="Имя, телефон, адрес, код"
                    id="search"
                    value={searchValue}
                    onChange={handleSearchChange}
                    onClear={handleClearSearch}
                    className="bg-white"
                />
            </div>
            <div>
                <DatePicker
                    name="date"
                    label="Дата"
                    placeholder="Выберите дату"
                    value={dateValue}
                    onChange={handleDateChange}
                    // onClear={handleClearDate}
                    className="bg-white"
                />
            </div>
            {/* Кнопка для очистки всех фильтров */}
            {(searchValue || dateValue) && (
                <Button
                    type="button"
                    onClick={handleClearAll}
                    className="ml-3"
                >
                    Очистить все
                </Button>
            )}
        </div>
    </div>
}