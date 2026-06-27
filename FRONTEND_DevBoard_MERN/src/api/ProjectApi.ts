import { isAxiosError } from "axios";
import { dashboardProjectSchema, type Project, type ProjectFormData } from "../types";
import api from "../utils/axios";

type ProjectApiType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export async function createProject(formData: ProjectFormData) {
    /* Function with Fetch the API */
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })

    /* TODO: add zod to the response obtained*/
    /* Catch the data response to json */
    const data = await response.json() 

    /* Catch the error, so we don't need to use trycatch with fetch */
    if (!response.ok) {
        throw new Error(data.error)
    }

    return data
}

/* TODO: add generic to the response obtained*/
export async function getProjects() {
    try {
        const { data } = await api('/projects')
        /* Validate with the Schema of zod to get the correct response */
        const response = dashboardProjectSchema.safeParse(data)
        if(!response.success) {
            throw new Error('there was an error getting the projects')
        }
        return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

/* TODO: add  or zod to the response obtained*/
export async function getProjectById(id:Project['_id']) {
    try {
        const { data } = await api(`/projects/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export async function updateProject({formData, projectId}:ProjectApiType) {
    try {
        const { data } = await api.put<string>(`/projects/${projectId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteProject(id:Project['_id']) {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}