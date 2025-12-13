import axios from "axios"
import { API_URL } from "@/lib/urls"

const api = axios.create({
    baseURL: API_URL,
})

let accessToken = null
let logoutHandler = null

export const setAccessToken = (token) => {
    accessToken = token
}
export const setLogoutHandler = (fn) => {
    logoutHandler = fn
}

api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            accessToken = null
            if (logoutHandler) {
                logoutHandler()
            }
        }

        return Promise.reject(error)
    }
)


export default api