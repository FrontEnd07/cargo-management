import clsx from "clsx"
import { forwardRef, HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react"


const Table = forwardRef<
    HTMLTableElement,
    HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
    <div>
        <table
            ref={ref}
            className={clsx("w-full bg-white dark:bg-gray-800 shadow-md shadow-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400", className)}
            {...props}
        />
    </div>
));
Table.displayName = "Table";


const TableHeader = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead ref={ref} className={clsx("text-xs overflow-hidden bg-gray-50 dark:!bg-gray-700 text-gray-700 uppercase dark:text-gray-400 overflow-hidden", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = forwardRef<
    HTMLTableSectionElement,
    HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={clsx("[&_tr:last-child]:border-0", className)}
        {...props}
    />
));
TableBody.displayName = "TableBody";

const TableRow = forwardRef<
    HTMLTableRowElement,
    HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={clsx(
            "align-top [&:not(:last-child)]:border-b dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600",
            className
        )}
        {...props}
    />
));
TableRow.displayName = "TableRow";

const TableHead = forwardRef<
    HTMLTableCellElement,
    ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={clsx(
            "px-6 py-3 text-center",
            className
        )}
        {...props}
    />
));
TableHead.displayName = "TableHead";

const TableCell = forwardRef<
    HTMLTableCellElement,
    TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={clsx(
            "px-6 py-4 dark:border-gray-700 border-gray-200",
            className
        )}
        {...props}
    />
));
TableCell.displayName = "TableCell";

export {
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
    TableBody
}