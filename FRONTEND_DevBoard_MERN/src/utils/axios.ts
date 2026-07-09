import axios from 'axios'

/* BaseURL to axios */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// The interceptors works every time that we use a request to the server
api.interceptors.request.use( config => {
    const token = localStorage.getItem('auth_token')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
export default api