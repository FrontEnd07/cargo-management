import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, createToken, prisma } from '6_shared/lib'

export async function POST(request: NextRequest) {
    try {
        const { email, password, name } = await request.json()

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { message: 'Пользователь уже существует' },
                { status: 400 }
            )
        }

        const hashedPassword = await hashPassword(password)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'USER',
            },
        })

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
            maxAge: 24 * 60 * 60,
        })

        return response
    } catch (error) {
        return NextResponse.json(
            { message: 'Внутренняя ошибка сервера' },
            { status: 500 }
        )
    }
}