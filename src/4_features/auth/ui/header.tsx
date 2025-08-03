"use client";

import Link from 'next/link'
import { usePathname } from 'next/navigation';

export const Header = () => {
    const pathname = usePathname();

    return <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            AuthSystem
        </Link>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Войти в учётную запись.
        </h2>
        <p className="mt-2 text-sm text-gray-600">
            {pathname === '/auth/register' ? 'Есть аккаунт?' : 'Нет аккаунт?'}{' '}
            <Link href={pathname === '/auth/register' ? '/auth/login' : '/auth/register'} className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                {pathname === '/auth/register' ? 'Войти' : 'Регистрация'}
            </Link>
        </p>
    </div>
}