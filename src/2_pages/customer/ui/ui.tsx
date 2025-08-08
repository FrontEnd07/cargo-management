import type { CustomerParamsPageProps } from "../type";
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
        date,
    } = await searchParams;

    const customerData = await customerModel.getWithpagination({
        page: parseInt(page),
        limit: parseInt(limit),
        search: search || undefined,
        sortBy,
        sortOrder: sortOrder as "asc" | "desc",
        date: date || undefined
    });

    return (
        <div>
            <CustomerHeader />
            <CustomerBody dataCustomer={customerData} />
        </div>
    );
};