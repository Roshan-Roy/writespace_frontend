import { createContext, useEffect, useState, useContext } from "react"

const ThemeContext = createContext({
    theme: "light",
    switchToLight: () => { },
    switchToDark: () => { }
})

export const ThemeProvider = ({ children, storageKey, defaultTheme }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme)

    const switchToDark = () => {
        setTheme("dark")
    }
    const switchToLight = () => {
        setTheme("light")
    }

    useEffect(() => {
        localStorage.setItem(storageKey, theme)
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(theme)
    }, [theme, storageKey])

    return <ThemeContext.Provider value={{ theme, switchToLight, switchToDark }}>
        {children}
    </ThemeContext.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeContext)

    if (!context)
        throw new Error("useTheme must be used within a ThemeProvider")

    return context
}