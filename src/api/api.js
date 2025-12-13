import axios from "axios";
import { API_URL } from "@/lib/urls";

const api = axios.create({
    baseURL: API_URL,
});

let accessToken = null;
let refreshToken = null;
let logoutHandler = null;
let loginHandler = null;
let isRefreshing = false;
let failedQueue = [];

export const setTokens = (access, refresh) => {
    accessToken = access;
    refreshToken = refresh;
};

export const clearTokens = () => {
    accessToken = null;
    refreshToken = null;
};

export const setLogoutHandler = (fn) => {
    logoutHandler = fn;
};

export const setLoginHandler = (fn) => {
    loginHandler = fn;
};

// Helper to process the queue of failed requests
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Request interceptor to add access token
api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Response interceptor for 401 handling
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue this request until the refresh is done
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                }).catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await axios.post(`${API_URL}token/refresh/`, {
                    refresh: refreshToken,
                });

                const { access, refresh } = response.data;
                setTokens(access, refresh);
                if (loginHandler) loginHandler({ access, refresh });

                processQueue(null, access);

                originalRequest.headers.Authorization = `Bearer ${access}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                if (logoutHandler) logoutHandler();
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
