import { isAxiosError } from "axios";
import { dashboardProjectSchema, projectSchema, type Project, type ProjectFormData } from "../types";
import api from "../utils/axios";

type ProjectApiType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}

export async function createProject(formData: ProjectFormData) {
    const token = localStorage.getItem('auth_token')
    /* Function with Fetch API */
    const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
    /* const token =  localStorage.getItem('auth_token')  // We used the interceptors in the config of axios to do this*/

    try {
        const { data } = await api('/projects')
        // I used interceptors in the config axios to pass the Authorization jwttoken in every request
        /* const { data } = await api('/projects', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }) */
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
        const response = projectSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
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