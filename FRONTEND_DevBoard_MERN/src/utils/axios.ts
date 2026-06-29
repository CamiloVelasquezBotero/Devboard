import axios from 'axios'

/* BaseURL to axios */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default api

export function formatDate(isoString:string) : string {
    const date = new Date(isoString)
    const formater = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return formater.format(date)
}