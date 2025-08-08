'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationProps } from './types'
import { getPageNumbers } from "./lib/get-page-numbers";

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    showInfo = true,
    total = 0,
    limit = 10
}: PaginationProps) => {
    const pageNumbers = getPageNumbers({
        totalPages: totalPages,
        currentPage: currentPage
    });

    const startItem = (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, total);

    return (
        <>

            {/* Информация о записях */}
            {showInfo && (
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Показано{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">{startItem}-{endItem}{" "}</span>из
                    <span className="font-semibold text-gray-900 dark:text-white">{" "}{total}</span>
                </span>
            )}
            <ul className='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8 shadow-md'>
                {/* Предыдущая страница */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                </li>

                {/* Номера страниц */}
                {pageNumbers.map((page, index) => (
                    <li key={index}>
                        {page === '...' ? (
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                ...
                            </span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page as number)}
                                className={`flex hover:bg-gray-100 cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === page ? 'dark:bg-gray-700 dark:text-white bg-gray-100 text-gray-700' : 'bg-white dark:bg-gray-800 border-gray-300 text-gray-500'}`}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}

                {/* Следующая страница */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </li>
            </ul>
        </>
    );
};