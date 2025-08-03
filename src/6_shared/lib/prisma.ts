import { PrismaClient } from '@prisma/client'

// Глобальный инстанс для предотвращения множественных подключений в dev-режиме
declare global {
    var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') globalThis.prisma = prisma

export default prisma