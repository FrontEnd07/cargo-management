import { GlobalTypeTableProps, ManualPageLayout } from "6_shared/ui"
import { CreateProductRoutes } from "4_features/manual"
import { trpc } from "app/_trpcClient";

export async function ProductRoutes({ searchParams }: GlobalTypeTableProps) {
    const {
        page = "1",
        limit = "10",
        search = "",
        sortBy = "createAt",
        sortOrder = "desc"
    } = await searchParams

    // const currencyData = await currencyModel.getCurrency({
    //     page: parseInt(page),
    //     limit: parseInt(limit),
    //     search: search || undefined,
    //     sortBy,
    //     sortOrder: sortOrder as "asc" | "desc",
    // })

    return <ManualPageLayout
        title='Направление | Добавить направление'
        addComponent={<CreateProductRoutes />}
        tableComponent={undefined} />
}
