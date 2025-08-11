"use client";

import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useModalStore } from "6_shared/store";
import { Button } from "6_shared/ui";
import { X, LucideIcon, Icon } from "lucide-react";

interface DialogModalProps {
    children: ReactNode;
    title: string;
    icon?: LucideIcon
}

export const DialogModal = ({ children, title, icon: IconComponent }: DialogModalProps) => {
    const { closeModal, openModal, isOpen } = useModalStore()

    return <Dialog.Root open={isOpen} onOpenChange={(open) => {
        if (open) openModal()
        else closeModal()
    }}>
        <Dialog.Trigger>
            <Button className="flex items-center">
                {IconComponent && (
                    <span className="mr-2">
                        <IconComponent className="w-4 h-4" />
                    </span>
                )}
                {title}
            </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg dark:bg-slate-800 dark:border-gray-700 border-gray-950/5 border">
                <Dialog.Title className="border-b border-gray-700 border-gray-950/5 dark:border-white/10 p-4 py-3 w-full">{title}</Dialog.Title>
                <div>
                    {children}
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
}