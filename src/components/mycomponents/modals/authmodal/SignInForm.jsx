import { DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signinSchema } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"
import CustomToast from "../../toast/CustomToast"
import { CircleX, CircleCheck } from "lucide-react"
import axios from "axios"
import { API_URL } from "@/lib/api"

const SignInForm = ({ setOpenModal, setDisableClosing }) => {
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const disabled = !signinSchema.safeParse(data).success

    const handleInputChange = (value, fieldName) => {
        setData(prevData => ({ ...prevData, [fieldName]: value }))
    }
    const handleFormChange = () => {
        setOpenModal("signup")
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const result = signinSchema.safeParse(data)
        if (!result.success) return
        signIn(result.data)
    }

    const signIn = async (data) => {
        try {
            setDisableClosing(true)
            setLoading(true)
            await axios.post(`${API_URL}token/`, data)
            setOpenModal(null)
            toast.custom(t => <CustomToast t={t} message="Signed in successfully!" icon={CircleCheck} iconStyles="text-green-500" />)
        } catch (e) {
            const status = e.response?.status
            if (status === 401) {
                toast.custom(t => <CustomToast t={t} message="Invalid credentials" icon={CircleX} iconStyles="text-red-500" />)
            } else {
                toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
            }
            setLoading(false)
        } finally {
            setDisableClosing(false)
        }
    }

    return (
        <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
            <DialogTitle className="text-3xl text-center font-heading">Sign in</DialogTitle>
            <div className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter username" className="h-11 px-4 rounded-2xl" value={data.username} onChange={e => handleInputChange(e.target.value, "username")} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter password" className="h-11 px-4 rounded-2xl" value={data.password} onChange={e => handleInputChange(e.target.value, "password")} />
                </div>
                <Button className="w-full mt-3 h-11 rounded-2xl" disabled={disabled || loading}>{loading ? <Spinner /> : "Sign In"}</Button>
            </div>
            <p className="text-center text-sm">No account? <u onClick={handleFormChange} className="cursor-default">Sign up</u></p>
        </form>
    )
}

export default SignInForm