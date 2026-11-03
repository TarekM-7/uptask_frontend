import api from "@/lib/axios";
import type { ProjectFormData } from "@/types";
import { isAxiosError } from "axios";

type ApiErrorResponse = {
    errors: { msg: string; path?: string }[]
}

export async function createProject(formData: ProjectFormData) {
    try {
        const {data} = await api.post('/projects', formData)
        return data
    } catch (error) {
        if (isAxiosError<ApiErrorResponse>(error) && error.response) {
            throw new Error(error.response.data?.errors?.[0]?.msg ?? 'Hubo un error')
        }
        throw new Error('No se pudo conectar con el servidor')
    }
}