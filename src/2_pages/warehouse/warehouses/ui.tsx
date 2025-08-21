import { Header } from "./header";
import { Body } from "./body";
import { GlobalTypeTableProps } from "6_shared/ui"
import { warehouse } from "2_pages/warehouse";

export const Warehouses = async ({ searchParams }: GlobalTypeTableProps) => {
    const { search = '', page = "1", limit = "10", sortBy = "createdAt", sortOrder = "desc" } = await searchParams

    const warehouseData = await warehouse.getAll({
        page: parseInt(page),
        limit: parseInt(limit),
        search: search || undefined,
        sortBy,
        sortOrder: sortOrder as "asc" | "desc"
    })

    return <div>
        <div className="absolute -top-0 right-0">
            <Header />
        </div>
        <div className="my-8 relative">
            <Body data={warehouseData} />
        </div>
    </div>

}