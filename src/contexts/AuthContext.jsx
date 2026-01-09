import { createContext, useEffect, useState, useContext } from "react"
import { setTokens, clearTokens, setUpdateTokensHandler, setLogoutHandler } from "@/api/api"

const AuthContext = createContext({
    isAuthenticated: false,
    auth: null,
    updateUser: () => { },
    login: () => { },
    logout: () => { }
})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedAuth = localStorage.getItem("auth")
        return storedAuth ? JSON.parse(storedAuth) : null
    })

    const login = ({ access, refresh, user }) => {
        setAuth({ access, refresh, user: { username: user.username, email: user.email, image: user.profile.image } })
    }
    const updateTokens = ({ access, refresh }) => {
        setAuth(prevAuth => ({ ...prevAuth, access, refresh }))
    }
    const updateUser = ({ username, image }) => {
        setAuth(prevAuth => ({ ...prevAuth, user: { ...prevAuth.user, username, image } }))
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
        setUpdateTokensHandler(updateTokens)
        setLogoutHandler(logout)
    }, [])

    return <AuthContext.Provider value={{ isAuthenticated: !!auth, auth, updateUser, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context)
        throw new Error("useAuth must be used within a AuthProvider")

    return context
}