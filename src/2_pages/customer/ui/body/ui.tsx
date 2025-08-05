"use client";

import { customerColumns } from '2_pages/customer';
import { CustomerTable } from "4_features/customer-table";

export const CustomerBody = ({ dataCustomer }: { dataCustomer: any }) => {
    return (
        <div className="my-8 relative overflow-x-auto sm:rounded-lg">
            <CustomerTable
                columns={customerColumns}
                data={dataCustomer}
            />
        </div>
    );
};