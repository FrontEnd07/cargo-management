"use client"

import {
    Breadcrumbs,
    DialogModal,
} from "6_shared/ui";
import { CreateCustomer } from "4_features/create-customer"
import { Plus } from 'lucide-react';

export const CustomerHeader = () => {

    return <div className="flex items-center justify-between">
        <Breadcrumbs />
        <div>
            <DialogModal title="Добавить клиента" icon={Plus}>
                <CreateCustomer />
            </DialogModal>
        </div>
    </div>;
};