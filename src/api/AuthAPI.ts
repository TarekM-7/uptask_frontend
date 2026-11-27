import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { type UserRegistrationForm, type ApiErrorResponse } from "@/types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = '/auth/create-account'
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if (isAxiosError<ApiErrorResponse>(error) && error.response) {
            throw new Error(error.response.data?.errors?.[0]?.msg ?? 'Hubo un error')
        }
        throw new Error('No se pudo conectar con el servidor')
    }
}
