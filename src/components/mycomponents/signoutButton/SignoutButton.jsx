import maskEmail from "@/lib/maskEmail"
import axios from "axios"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { API_URL } from "@/lib/urls"
import toast from "react-hot-toast"
import { CircleX } from "lucide-react"
import CustomToast from "../toast/CustomToast"

const SignoutButton = ({ email }) => {
    const { auth, logout } = useAuth()
    const [loading, setLoading] = useState(false)

    const handleSignout = async () => {
        if (loading) return
        try {
            setLoading(true)
            await axios.post(`${API_URL}signout/`, {
                refresh: auth.refresh
            }, {
                headers: {
                    Authorization: `Bearer ${auth.access}`,
                },
            })
            logout()
        } catch (e) {
            toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col select-none cursor-pointer gap-1.5 px-6 pt-6 pb-8 text-foreground/80 hover:text-foreground" onClick={handleSignout}>
            <span>{loading ? "Signing out..." : "Sign out"}</span>
            <span className="text-xs truncate">{maskEmail(email)}</span>
        </div>
    )
}

export default SignoutButton