"use client"

import { ReactNode } from "react"
import { Button } from "6_shared/ui"
import { Save } from "lucide-react"

interface ManualFormProps {
    children: ReactNode
    onSubmit: () => void
    isLoading?: boolean
    submitText?: string
}

export const ManualForm = ({
    children,
    onSubmit,
    isLoading = false,
    submitText = "Сохранить"
}: ManualFormProps) => {
    return (
        <>
            <div className="px-4">
                {children}
            </div>
            <div className="p-4">
                <Button
                    onClick={onSubmit}
                    isLoading={isLoading}
                    className="w-full flex items-center align-center justify-center"
                >
                    <Save className="h-5 w-5 mr-1" />
                    <span>{submitText}</span>
                </Button>
            </div>
        </>
    )
}