import api from "../utils/axios";
import { isAxiosError } from "axios";
import { type Project, type TaskFormData } from "../types";

type TaskAPI = {
    formData: TaskFormData
    projectId: Project['_id']
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