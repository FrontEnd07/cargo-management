import { Button } from "6_shared/ui";

interface PaginationControlsProps {
    page: number;
    setPage: (page: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
    totalPages: number;
    totalRecords?: number;
}

export const PaginationControls = ({
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    totalRecords
}: PaginationControlsProps) => {
    const pageSizeOptions = [5, 10, 20, 50, 100];

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            {/* Лимит записей */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">Показать</span>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setPage(1);
                    }}
                    className="w-full bg-gray-50 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer dark:text-white dark:placeholder-gray-400 dark:bg-gray-700"
                >
                    {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {totalRecords !== undefined ? `из ${totalRecords} записей` : 'записей'}
                </span>
            </div>

            {/* Пагинация */}
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                >
                    Первая
                </Button>

                <Button
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Предыдущая
                </Button>

                <span className="text-sm text-gray-700 dark:text-gray-300 px-2">
                    Страница {page} из {totalPages}
                </span>

                <Button
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >
                    Следующая
                </Button>

                <Button
                    size="sm"
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                >
                    Последняя
                </Button>
            </div>
        </div>
    );
};