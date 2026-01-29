import { createContext, useContext, useEffect, useState } from "react"
import api from "@/api/api"

const NotificationContext = createContext({
    count: 0,
    clearCount: () => { }
})

export const NotificationProvider = ({ children }) => {
    const [count, setCount] = useState(0)

    const fetchCount = async () => {
        try {
            const res = await api.get("notifications_count/")
            setCount(res.data.count)
        } catch {
            setCount(0)
        }
    }

    const clearCount = () => {
        setCount(0)
    }

    useEffect(() => {
        fetchCount()
    }, [])

    return (
        <NotificationContext.Provider value={{ count, clearCount }}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotifications = () => {
    const context = useContext(NotificationContext)

    if (!context) {
        throw new Error("useNotifications must be used inside NotificationProvider")
    }

    return context
}
