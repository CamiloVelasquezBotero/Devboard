import axios from 'axios'

/* BaseURL to axios */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default api