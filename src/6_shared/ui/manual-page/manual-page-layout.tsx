import { ReactNode } from "react"

interface ManualPageLayoutProps {
    title: string
    addComponent: ReactNode
    tableComponent: ReactNode
}

export const ManualPageLayout = ({
    title,
    addComponent,
    tableComponent
}: ManualPageLayoutProps) => {
    return (
        <div className="my-8 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4 lg:pr-3">
                <div className="dark:bg-gray-800 bg-white shadow-lg sm:rounded-lg overflow-hidden">
                    <div className="p-4 dark:bg-gray-700">
                        <span>{title}</span>
                    </div>
                    {addComponent}
                </div>
            </div>
            <div className="lg:col-span-8 lg:pl-3">
                {tableComponent}
            </div>
        </div>
    )
}