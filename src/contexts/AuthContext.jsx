import { createContext, useEffect, useState, useContext } from "react"

const AuthContext = createContext({
    isAuthenticated: false,
    auth: null,
    login: () => { },
    logout: () => { }
})

export const AuthContextProvider = ({ children }) => {
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
        } else {
            localStorage.removeItem("auth")
        }
    }, [auth])
    return <AuthContext.Provider value={{ isAuthenticated: !!auth, auth, login, logout }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}