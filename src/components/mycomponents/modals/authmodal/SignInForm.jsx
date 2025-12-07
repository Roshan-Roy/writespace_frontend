import { DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signinSchema } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"
import CustomToast from "../../toast/CustomToast"
import { CircleX, CircleCheck, EyeOff, Eye } from "lucide-react"
import axios from "axios"
import { API_URL } from "@/lib/api"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"
import { Link } from "react-router"
import { useAuth } from "@/contexts/AuthContext"

const SignInForm = ({ setOpenModal, setDisableClosing }) => {
    const { login } = useAuth()
    const [data, setData] = useState({
        username_or_email: "",
        password: ""
    })
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const disabled = !signinSchema.safeParse(data).success

    const handleInputChange = (value, fieldName) => {
        setData(prevData => ({ ...prevData, [fieldName]: value }))
    }
    const handleFormChange = () => {
        setOpenModal("signup")
    }
    const handleTogglePasswordVisibility = () => {
        setPasswordVisible(prevVisible => !prevVisible)
    }
    const signIn = async (data) => {
        try {
            setDisableClosing(true)
            setLoading(true)
            const response = await axios.post(`${API_URL}token/`, data)
            login(response.data)
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
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const result = signinSchema.safeParse(data)
        if (!result.success) return
        signIn(result.data)
    }
    return (
        <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
            <DialogTitle className="text-3xl text-center font-heading">Sign in</DialogTitle>
            <div className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="username_or_email">Username</Label>
                    <Input id="username_or_email" placeholder="Enter username or email" className="h-11 px-4 rounded-2xl" value={data.username_or_email} onChange={e => handleInputChange(e.target.value, "username_or_email")} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <InputGroup className="h-11 rounded-2xl">
                        <InputGroupInput id="password" type={passwordVisible ? "text" : "password"} placeholder="Enter password" className="pl-4" value={data.password} onChange={e => handleInputChange(e.target.value, "password")} />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton
                                className="rounded-xl"
                                size="icon-sm"
                                onClick={handleTogglePasswordVisibility}
                            >
                                {passwordVisible ? <Eye /> : <EyeOff />}
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <Button className="w-full mt-3 h-11 rounded-2xl" disabled={disabled || loading}>{loading ? <Spinner /> : "Sign In"}</Button>
            </div>
            <Link className="text-sm self-center hover:underline font-semibold" to="forgot_password">Forgot password?</Link>
            <p className="text-center text-sm">No account? <span onClick={handleFormChange} className={`cursor-pointer font-semibold ${loading ? "pointer-events-none" : ""}`}>Sign up</span></p>
        </form>
    )
}

export default SignInForm