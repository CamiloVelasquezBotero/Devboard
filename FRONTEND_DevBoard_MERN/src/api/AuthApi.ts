import api from "../utils/axios";
import { isAxiosError } from "axios";
import { userSchema, type CheckPasswordForm, type ConfirmToken, type ForgotPasswordForm, type NewPasswordForm, type RequestConfirmationCodeForm, type User, type UserRegistrationForm } from "../types";

export async function createAccount(formData:UserRegistrationForm) {
    try {
        const url = '/auth/create-account'
        const { data } = await api.post<string>(url, formData)

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(formData:ConfirmToken) {
    try {
        const url = 'auth/confirm-account'
        // TODO: Valid the data from axios with zod
        const { data } = await api.post(url, formData)

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestConfirmationCode(formData:RequestConfirmationCodeForm) {
    try {
        const url = 'auth/request-code'
        // TODO: Valid the data from axios with zod
        const { data } = await api.post(url, formData)

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function loginUser(formData:RequestConfirmationCodeForm) {
    try {
        const url = 'auth/login'
        // TODO: Valid the data from axios with zod
        const { data } = await api.post(url, formData)
        
        // Save it in localStorage
        localStorage.setItem('auth_token', data)

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function forgotPassword(formData:ForgotPasswordForm) {
    try {
        const url = 'auth/forgot-password'
        // TODO: Valid the data from axios with zod
        const { data } = await api.post(url, formData)

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function validateToken(formData:ConfirmToken) {
    try {
        const url = 'auth/validate-token'
        // TODO: Valid the data from axios with zod
        const { data } = await api.post(url, formData)

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updatePasswordWithToken({ formData, token}:{ formData:NewPasswordForm, token:ConfirmToken['token']}) {
    try {
        const url = `auth/update-password/${token}`
        // TODO: Valid the data from axios with zod
        const { data } = await api.post(url, formData)

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUser() {
    try {
        const { data } = await api('auth/user')
        const response = userSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function checkPassword(formData:CheckPasswordForm) {
    try {
        const url = `auth/check-password`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}