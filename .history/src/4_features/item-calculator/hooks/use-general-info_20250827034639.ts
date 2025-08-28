"use clients"

import { useState, useCallback } from "react";
import { GeneralInfo, GeneralInfoErrors } from "./types";
import { validateGeneralInfo } from "./validation";

export const useGeneralInfo = () => {
    const [generalInfo, setGeneralInfo] = useState<GeneralInfo>(() => ({
        employeeId: "",
        warehouseId: "",
        date: new Date().toLocaleDateString("sv-SE"),
        customerId: ""
    }));

    const [generalInfoErrors, setGeneralInfoErrors] = useState<GeneralInfoErrors>({});

    const handleGeneralInfoChange = useCallback((field: keyof GeneralInfo, value: string): void => {
        setGeneralInfo(prev => {
            if (prev[field] === value) return prev; // Избегаем лишних обновлений
            return { ...prev, [field]: value };
        });

        // Очищаем ошибку асинхронно
        setGeneralInfoErrors(prev => {
            if (!prev[field]) return prev;
            const { [field]: _, ...rest } = prev;
            return rest;
        });
    }, []);

    const clearGeneralInfo = useCallback(() => {
        setGeneralInfo({
            employeeId: "",
            warehouseId: "",
            date: new Date().toISOString().split("T")[0],
            customerId: ""
        });
        setGeneralInfoErrors({});
    }, []);

    const validateGeneralInfoData = useCallback((): boolean => {
        const errors = validateGeneralInfo(generalInfo);
        setGeneralInfoErrors(errors);
        return Object.keys(errors).length === 0;
    }, [generalInfo]);

    return {
        generalInfo,
        generalInfoErrors,
        handleGeneralInfoChange,
        clearGeneralInfo,
        validateGeneralInfoData
    };
};