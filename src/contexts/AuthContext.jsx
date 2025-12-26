import { createContext, useEffect, useState, useContext } from "react"
import { setTokens, clearTokens, setLoginHandler, setLogoutHandler } from "@/api/api"

const AuthContext = createContext({
    isAuthenticated: false,
    auth: null,
    login: () => { },
    logout: () => { }
})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem("auth")
        return storedAuth ? JSON.parse(storedAuth) : null
    })

    const login = (tokens) => {
        setAuth(tokens)
    }
    const logout = () => {
        setAuth(null)
    }

    useEffect(() => {
        if (auth) {
            localStorage.setItem("auth", JSON.stringify(auth))
            setTokens(auth.access, auth.refresh)
        } else {
            localStorage.removeItem("auth")
            clearTokens()
        }
    }, [auth])

    useEffect(() => {
        setLoginHandler(login)
        setLogoutHandler(logout)
    }, [])

    return <AuthContext.Provider value={{ isAuthenticated: !!auth, auth, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context)
        throw new Error("useAuth must be used within a AuthProvider")

    return context
}