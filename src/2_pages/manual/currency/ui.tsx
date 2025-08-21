import { ManualPageLayout, GlobalTypeTableProps } from "6_shared/ui"
import { AddCurrency, CurrencyTable } from "4_features/manual"
import { currencyModel } from "5_entities/manual"

export async function Currency({ searchParams }: GlobalTypeTableProps) {
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

    return (
        <ManualPageLayout
            title="Валюты | Добавить валюту"
            addComponent={<AddCurrency />}
            tableComponent={<CurrencyTable dataCurrency={currencyData} />}
        />
    )
}