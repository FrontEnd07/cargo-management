import { z } from "zod";

// Constants
const PHONE_PATTERNS = {
    FORMATTED: /^\+992 \(\d{2}\) \d{3}-\d{2}-\d{2}$/,
    DIGITS_ONLY: /^\d{9}$/
} as const;

const VALIDATION_LIMITS = {
    NAME: { MIN: 3 },
    ADDRESS: { MIN: 3 },
    TAG: { MIN: 2, MAX: 10 },
    PASS: { MIN: 6 },
    TAGS: { MIN: 1, MAX: 5 }
} as const;

// Error messages
const ERROR_MESSAGES = {
    NAME: `Введите имя (минимум ${VALIDATION_LIMITS.NAME.MIN} символа)`,
    PHONE: "Номер: (ХХ) ХХХ-ХХ-ХХ",
    DATE: "Дата обязательна",
    ADDRESS: "Введите адрес (минимум 3 символа)",
    PASS: `Введите парол (минимум ${VALIDATION_LIMITS.PASS.MIN} символа)`,
    TAG_MIN: `Тег должен содержать минимум ${VALIDATION_LIMITS.TAG.MIN} символа`,
    TAG_MAX: `Тег не должен превышать ${VALIDATION_LIMITS.TAG.MAX} символов`,
    TAGS_MIN: "Пожалуйста, добавьте хотя бы один тег",
    TAGS_MAX: `Вы можете добавить не более ${VALIDATION_LIMITS.TAGS.MAX} тегов`
} as const;

// Helper functions
const extractPhoneDigits = (phone: string): string => {
    const digits = phone.replace(/\D/g, '');
    return digits.slice(-9);
};

const isValidPhoneFormat = (phone: string): boolean => {
    return PHONE_PATTERNS.FORMATTED.test(phone) || PHONE_PATTERNS.DIGITS_ONLY.test(phone);
};

// Schemas
const tagSchema = z
    .string()
    .min(VALIDATION_LIMITS.TAG.MIN, ERROR_MESSAGES.TAG_MIN)
    .max(VALIDATION_LIMITS.TAG.MAX, ERROR_MESSAGES.TAG_MAX)
    .trim();

const phoneSchema = z
    .string()
    .trim()
    .refine(isValidPhoneFormat, {
        message: ERROR_MESSAGES.PHONE
    })
    .transform(extractPhoneDigits);

const nameSchema = z
    .string()
    .min(VALIDATION_LIMITS.NAME.MIN, ERROR_MESSAGES.NAME)
    .trim();

const passSchema = z
    .string()
    .min(VALIDATION_LIMITS.PASS.MIN, ERROR_MESSAGES.PASS)
    .trim();

const addressSchema = z
    .string()
    .min(VALIDATION_LIMITS.ADDRESS.MIN, ERROR_MESSAGES.ADDRESS)
    .trim();

const dateSchema = z
    .date({
        message: ERROR_MESSAGES.DATE
    });

const codesSchema = z
    .array(tagSchema)
    .min(VALIDATION_LIMITS.TAGS.MIN, ERROR_MESSAGES.TAGS_MIN)
    .max(VALIDATION_LIMITS.TAGS.MAX, ERROR_MESSAGES.TAGS_MAX);

export {
    tagSchema,
    phoneSchema,
    nameSchema,
    addressSchema,
    dateSchema,
    codesSchema,
    passSchema
};