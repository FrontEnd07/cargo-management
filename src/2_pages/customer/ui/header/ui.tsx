"use client"

import { Button, Breadcrumbs } from "6_shared/ui";
import * as Dialog from "@radix-ui/react-dialog";
import { Form } from '../form';
import { useModalStore } from "6_shared/store";
import { X } from 'lucide-react';

export const CustomerHeader = () => {
    const { closeModal, openModal, isOpen } = useModalStore()

    return <div className="flex items-center justify-between">
        <Breadcrumbs />
        <div>
            <Dialog.Root open={isOpen} onOpenChange={(open) => {
                if (open) openModal()
                else closeModal()
            }}>
                <Dialog.Trigger asChild>
                    <Button>Добавить клиента</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                    <Dialog.Content className="fixed shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg dark:bg-slate-800 dark:border-gray-700 border-gray-950/5 border">
                        <Dialog.Title className="border-b border-gray-700 border-gray-950/5 dark:border-white/10 p-4 py-3 w-full">Добавить клиента</Dialog.Title>
                        <div>
                            <Form />
                        </div>
                        <Dialog.Close asChild
                            className="cursor-pointer text-gray-300 hover:text-white  absolute z-10 -top-9 -right-10 flex items-center justify-center rounded-full transition-colors duration-200"
                            onClick={closeModal}
                        >
                            <X />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    </div>;
};