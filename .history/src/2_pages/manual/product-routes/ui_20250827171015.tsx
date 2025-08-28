import { GlobalTypeTableProps, ManualPageLayout } from "6_shared/ui"
import { CreateProductRoutes, ProductRoutesTable } from "4_features/manual"

export async function ProductRoutes({ searchParams }: GlobalTypeTableProps) {

    return <ManualPageLayout
        title='Направление | Добавить направление'
        addComponent={<CreateProductRoutes />}
        tableComponent={<ProductRoutesTable />} />
}
