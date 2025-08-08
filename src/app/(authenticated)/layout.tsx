import { Header } from "3_widgets/header";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from 'next/navigation';

interface AuthenticatedLayoutProps {
    children: ReactNode
}

export type Payload = {
    sessionId: string;
    role: string;
    userId: string;
}

export default async function AuthenticatedLayout({
    children
}: AuthenticatedLayoutProps) {
    const token = (await cookies()).get("__AingMaung")?.value

    if (!token) {
        redirect('/login');
    }

    const JWTSECRET = process.env.JWT_SECRET;

    if (!JWTSECRET) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500">Ошибка сервера: JWT_SECRET не настроен</div>
            </div>
        );
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWTSECRET));

        return (
            <div className="min-h-screen">
                <Header payload={payload as Payload} />
                <main className="container py-8 max-w-7xl mx-auto lg:px-8">
                    {children}
                </main>
            </div>
        );
    } catch (error) {
        console.error('Ошибка верификации токена:', error);
        redirect('/auth/login');
    }
}