// Если используешь react-toastify
import { toast as toastifyToast } from 'react-toastify';

export const toast = {
    success: (message: string) => toastifyToast.success(message),
    error: (message: string) => toastifyToast.error(message),
    info: (message: string) => toastifyToast.info(message),
    warning: (message: string) => toastifyToast.warn(message),
};
