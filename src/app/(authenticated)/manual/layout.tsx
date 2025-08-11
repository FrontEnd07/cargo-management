import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "6_shared/ui";

interface WarehouceLayoutProps {
    children: ReactNode
}

export default async function WarehouceLayout({ children }: WarehouceLayoutProps) {
    try {
        return <div>
            <div className="flex items-center justify-between">
                <Breadcrumbs />
            </div>
            <div>
                {children}
            </div>
        </div>
    } catch (error) {
        console.error();
        redirect('/auth/login')
    }
}
