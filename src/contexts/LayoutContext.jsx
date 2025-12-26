import { createContext, useState, useContext } from "react"

const LayoutContext = createContext()

export const LayoutProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return <LayoutContext.Provider value={{
        sidebarOpen,
        setSidebarOpen
    }}>
        {children}
    </LayoutContext.Provider>
}

export const useLayout = () => {
    const context = useContext(LayoutContext)

    if (!context)
        throw new Error("useLayout must be used within a LayoutProvider")

    return context
}