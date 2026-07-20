import api from "../utils/axios";
import { isAxiosError } from "axios";
import { taskSchema, type Project, type Task, type TaskFormData } from "../types";

type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
    status: Task['status']
}

export async function createTask({formData, projectId}:Pick<TaskAPI, 'formData' | 'projectId'>) { /* We used the Pick if the Type changes in the future */
    try {
        const { data } = await api.post<string>(`/projects/${projectId}/tasks`, formData)
        return data
    } catch (error) { 
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw error
    } 
} 

export async function getTaskById({projectId, taskId}:Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api(url)
        const response = taskSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function updateTask({projectId, taskId, formData}:Pick<TaskAPI, 'projectId' | 'taskId' | 'formData'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function deleteTaskById({projectId, taskId}:Pick<TaskAPI, 'projectId' | 'taskId'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function updateStatus({projectId, taskId, status}:Pick<TaskAPI, 'projectId' | 'taskId' | 'status'>) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`
        const { data } = await api.post<string>(url, { status })
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}