import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, createToken, prisma } from '6_shared/lib'

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user || !(await verifyPassword(password, user.password))) {
            return NextResponse.json(
                { message: 'Неверные учетные данные' },
                { status: 401 }
            )
        }

        const token = await createToken({ userId: user.id })

        const { password: _, ...userWithoutPassword } = user


        const response = NextResponse.json({
            user: userWithoutPassword,
            token,
        })

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60, // 24 hours
        })

        return response
    } catch (error) {
        return NextResponse.json(
            { message: 'Внутренняя ошибка сервера' },
            { status: 500 }
        )
    }
}