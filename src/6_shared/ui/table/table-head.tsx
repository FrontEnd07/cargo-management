import { ReactNode } from "react"

interface TableHeadProps {
    children: ReactNode
}

export const TableHead = ({ children }: TableHeadProps) => {
    return <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">{children}</thead>
}