import {
    registrSchema,
    loginSchema
} from "4_features/auth";
import { router, publicProcedure, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { z } from "zod";
import { Payload } from "6_shared/types";
import { cookies } from "next/headers";
import { Role } from "@prisma/client";

export const authRouter = router({
    Register: publicProcedure
        .input(registrSchema)
        .mutation(async ({ input, ctx }) => {
            // cek apakah ada email sama

            const { db } = ctx;

            const userIsExist = await db.user.findFirst({
                where: {
                    OR: [
                        {
                            name: input.name,
                        },
                        {
                            phone: input.phone,
                        },
                    ],
                },
            });

            if (userIsExist) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Это имя или номер уже используют. Попробуй выбрать другое.",
                });
            }

            //hash password
            const hashPassword = await bcrypt.hash(input.password, 12);

            try {
                await db.user.create({
                    data: {
                        name: input.name,
                        phone: input.phone,
                        password: hashPassword,
                    },
                });
                return {
                    message:
                        "Вы успешно зарегистрировались. Чтобы активировать аккаунт, свяжитесь с администратором!",
                };
            } catch {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Не удалось зарегистрировать данные",
                });
            }
        }),

    Login: publicProcedure
        .input(loginSchema)
        .mutation(async ({ ctx, input }) => {
            const JWTSECRET = new TextEncoder().encode(process.env.JWT_SECRET);

            const { db } = ctx;

            //cek email ada dan user active
            const findUser = await db.user.findFirst({
                where: {
                    AND: [
                        { isActive: true },
                        {
                            OR: [
                                {
                                    phone: input.phone,
                                },
                            ],
                        },
                    ],
                },
            });

            if (!findUser) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Invalid Credential",
                });
            }

            const isPasswordMatch = await bcrypt.compare(
                input.password,
                findUser.password
            );

            if (!isPasswordMatch) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Invalid Credential",
                });
            }

            //cek session jika active delete
            const isSessionActive = await db.session.findUnique({
                where: {
                    userId: findUser.id,
                },
            });

            if (isSessionActive) {
                await db.session.delete({
                    where: {
                        userId: isSessionActive.userId,
                    },
                });
            }

            // create session jika tidak ada sessiin aktif
            const createSession = await db.session.create({
                data: {
                    userId: findUser.id,
                },
            });

            // return { message: `${createSession.userId}, Selamat datang kembali!` };

            const payload: Payload = {
                sessionId: createSession.id,
                role: findUser.role as Role,
                userId: findUser.id,
            };

            // // create jwt token u cookie
            const token = await new SignJWT(payload)
                .setProtectedHeader({
                    alg: "HS256",
                })
                .setExpirationTime("1d")
                .sign(JWTSECRET);

            const cookieStore = await cookies();
            cookieStore.set({
                name: "__AingMaung",
                value: token,
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24, //1day
                sameSite: "lax",
            });

            return { message: `${findUser.name}, Добро пожаловать!` };
        }),

    Logout: publicProcedure
        .input(
            z.object({
                sessionId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { db } = ctx

            try {
                await db.session.delete({
                    where: {
                        id: input.sessionId,
                    }
                });

                (await cookies()).delete("__AingMaung");
            } catch {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Не удалось выйти из системы"
                })
            }
        }),
        // getAllUser: protectedProcedure
        // .input(
        //     z.object({
                
        //     })
        // )
})