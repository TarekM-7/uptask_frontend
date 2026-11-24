import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { type ApiErrorResponse, type Project, type Task, type TaskFormData } from "@/types";

type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
}

export async function createTask({formData, projectId}: Pick<TaskAPI, 'formData' | 'projectId'>) {
    try {
        const url = `/projects/${projectId}/tasks`
        const {data} = await api.post(url, formData)
        return data.data
    } catch (error) {
        if (isAxiosError<ApiErrorResponse>(error) && error.response) {
            throw new Error(error.response.data?.errors?.[0]?.msg ?? 'Hubo un error')
        }
        throw new Error('No se pudo conectar con el servidor')
    }
}

export async function getTaskById({projectId, taskId}: Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api(url)
        return data.data
    } catch (error) {
        if (isAxiosError<ApiErrorResponse>(error) && error.response) {
            throw new Error(error.response.data?.errors?.[0]?.msg ?? 'Hubo un error')
        }
        throw new Error('No se pudo conectar con el servidor')
    }
}