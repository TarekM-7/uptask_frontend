import api from "@/lib/axios";
import { dashboardProjectSchema, type Project, type ProjectFormData } from "@/types";
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

export async function getProjects() {
    try {
        const {data} = await api('/projects')
        const response = dashboardProjectSchema.safeParse(data.data)
        if (response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError<ApiErrorResponse>(error) && error.response) {
            throw new Error(error.response.data?.errors?.[0]?.msg ?? 'Hubo un error')
        }
        throw new Error('No se pudo conectar con el servidor')
    }
}

export async function getProjectsById(id: Project['_id']) {
    try {
        const {data} = await api(`/projects/${id}`)
        return data.data
    } catch (error) {
        if (isAxiosError<ApiErrorResponse>(error) && error.response) {
            throw new Error(error.response.data?.errors?.[0]?.msg ?? 'Hubo un error')
        }
        throw new Error('No se pudo conectar con el servidor')
    }
}

type ProjectAPIType = {
    formData: ProjectFormData
    projectId: Project['_id']
}

export async function updateProject({formData, projectId}: ProjectAPIType) {
    try {
        const {data} = await api.put(`/projects/${projectId}`, formData)
        return data.data
    } catch (error) {
        if (isAxiosError<ApiErrorResponse>(error) && error.response) {
            throw new Error(error.response.data?.errors?.[0]?.msg ?? 'Hubo un error')
        }
        throw new Error('No se pudo conectar con el servidor')
    }
}

export async function deleteProject(id: Project['_id']) {
    try {
        await api.delete(`/projects/${id}`)
    } catch (error) {
        if (isAxiosError<ApiErrorResponse>(error) && error.response) {
            throw new Error(error.response.data?.errors?.[0]?.msg ?? 'Hubo un error')
        }
        throw new Error('No se pudo conectar con el servidor')
    }
}