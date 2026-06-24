import type { ProjectFormData } from "../types";
import api from "../utils/axios";

export async function createProject(formData:ProjectFormData) {
    try {
        /* Using "Fetch API" */
        const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

        const data = await response.json()

        if(!response.ok) {
            throw new Error(`There was an error in the fetch: ${response.status}: ${data.errors}`)
        }     
        console.log(data)
    } catch (error) {
        console.log(`There was an error creating the project: ${error}`)
    }
}