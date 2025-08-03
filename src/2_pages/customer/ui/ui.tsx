import type { CustomerParamsPageProps } from "../type";
import { breadcrumbs } from "../config";
import { CustomerHeader } from "./header";
import { CustomerBody } from "./body";
import { customerModel } from "../model";

export const Customer = async ({ searchParams }: CustomerParamsPageProps) => {
    const {
        page = "1",
        limit = "10",
        search = "",
        sortBy = "createAt",
        sortOrder = "desc",
    } = searchParams;

    const customerData = await customerModel.getWithpagination({
        page: parseInt(page),
        limit: parseInt(limit),
        search: search || undefined,
        sortBy,
        sortOrder: sortOrder as "asc" | "desc"
    });

    return (
        <div>
            <CustomerHeader breadcrumbs={breadcrumbs} />
            <CustomerBody dataCustomer={customerData} />
        </div>
    );
};