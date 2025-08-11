import { AddCurrency } from "./add-currency"
import { TableCurrency } from "./table-currency"
import { currencyModel, CurrencyProps } from "2_pages/manual"

export const Currency = async ({ searchParams }: CurrencyProps) => {
    const {
        page = "1",
        limit = "10",
        search = "",
        sortBy = "createAt",
        sortOrder = "desc"
    } = await searchParams

    const currencyData = await currencyModel.getCurrency({
        page: parseInt(page),
        limit: parseInt(limit),
        search: search || undefined,
        sortBy,
        sortOrder: sortOrder as "asc" | "desc",
    })

    return <div className="my-8 relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 lg:pr-3">
            <AddCurrency />
        </div>
        <div className="lg:col-span-8 lg:pl-3">
            <TableCurrency dataCurrency={currencyData} />
        </div>
    </div>
}