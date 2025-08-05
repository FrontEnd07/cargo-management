// Генерируем номера страниц для показа
export const getPageNumbers = ({ totalPages, currentPage }: { totalPages: number; currentPage: number; }) => {
    const pages: (number | string)[] = [];
    const showPages = 5; // Количество видимых страниц

    if (totalPages <= showPages) {
        // Если страниц мало, показываем все
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        // Сложная логика для многих страниц
        const start = Math.max(1, currentPage - Math.floor(showPages / 2));
        const end = Math.min(totalPages, start + showPages - 1);

        if (start > 1) {
            pages.push(1);
            if (start > 2) pages.push('...');
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }
    }

    return pages;
};