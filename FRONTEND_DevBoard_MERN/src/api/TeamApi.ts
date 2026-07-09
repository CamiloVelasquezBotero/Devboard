import { isAxiosError } from "axios";
import api from "../utils/axios";
import { teamMembersSchema, type Project, type TeamMember } from "../types";
import type { TeamMemberForm } from "../types";

export async function  findUserByEmail ({projectId, formData}:{projectId: Project['_id'], formData: TeamMemberForm}) {
    try {
        const url = `/projects/${projectId}/team/find`
        const { data } = await api.post(url, formData)
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        console.error(`There was an error finding the user by email: ${error}`)
    }
}

export async function addUserToProject ({projectId, id}:{projectId: Project['_id'], id: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.post(url, { id })
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        console.error(`There was an error adding the user to the project: ${error}`)
    }
}

export async function getProjectTeam (projectId:Project['_id']) {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api(url)
        const response = teamMembersSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        console.error(`There was an error getting the project team: ${error}`)
    }
}

export async function RemoveUserFromProject ({projectId, userId}:{projectId: Project['_id'], userId: TeamMember['_id']}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        console.error(`There was an error adding the user to the project: ${error}`)
    }
}


