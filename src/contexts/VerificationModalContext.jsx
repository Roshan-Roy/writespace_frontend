import { createContext, useContext, useState } from "react"

const VerificationModalContext = createContext({
    data: null,
    setVerificationModalData: () => { },
})

export const VerificationModalProvider = ({ children }) => {
    const [data, setData] = useState(null)

    const setVerificationModalData = (data) => {
        setData(data)
    }

    return (
        <VerificationModalContext.Provider value={{ data, setVerificationModalData }}>
            {children}
        </VerificationModalContext.Provider>
    )
}

export const useVerificationModal = () => {
    const context = useContext(VerificationModalContext)

    if (!context) {
        throw new Error("useVerificationModal must be used inside VerificationModalProvider")
    }

    return context
}
