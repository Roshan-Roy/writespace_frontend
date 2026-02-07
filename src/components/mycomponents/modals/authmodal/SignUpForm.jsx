import { DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "./InputError"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { signupSchema, formatErrors } from "@/lib/validation"
import { API_URL } from "@/lib/urls"
import axios from "axios"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"
import { CircleCheck, CircleX, EyeOff, Eye } from "lucide-react"
import CustomToast from "../../toast/CustomToast"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"
import { useVerificationModal } from "@/contexts/VerificationModalContext"

const SignUpForm = ({ setOpenModal, setDisableClosing }) => {
    const { setVerificationModalData } = useVerificationModal()

    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFormChange = () => {
        setOpenModal("signin")
    }
    const handleInputChange = (value, fieldName) => {
        setData(prevData => ({ ...prevData, [fieldName]: value }))
        setErrors(preErrors => ({ ...preErrors, [fieldName]: "" }))
    }
    const handleTogglePasswordVisibility = () => {
        setPasswordVisible(prevVisible => !prevVisible)
    }
    const signUp = async (data) => {
        try {
            setDisableClosing(true)
            setLoading(true)
            const response = await axios.post(`${API_URL}signup/`, data)
            const signupData = response.data.data
            setOpenModal(null)
            setVerificationModalData({
                email_subject: "Activate your WriteSpace account",
                email_body: "Click the link to verify your account:",
                email_to: signupData.email_to,
                link: signupData.verify_email_url,
                message: "This is a demo of the email verification flow. The verification link is shown as if it were sent to"
            })
            //toast.custom(t => <CustomToast t={t} message="Verification email sent!" icon={CircleCheck} iconStyles="text-green-500" />)
        } catch (e) {
            console.log(e)
            const status = e.response?.status
            if (status === 400) {
                const { username, email } = e.response.data || {}
                setErrors(prev => ({
                    ...prev,
                    username: Array.isArray(username) ? username[0] : "",
                    email: Array.isArray(email) ? email[0] : ""
                }))
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

        const result = signupSchema.safeParse(data)
        if (result.success) {
            setErrors(prevErrors => ({ ...prevErrors, email: "", username: "" }))
            signUp(result.data)
        } else {
            setErrors(prevErrors => ({ ...prevErrors, ...formatErrors(result.error.issues) }))
        }
    }
    return (
        <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
            <DialogTitle className="text-3xl text-center font-heading">Sign up</DialogTitle>
            <div>
                <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter username" className="h-11 px-4 rounded-2xl" value={data.username} onChange={e => handleInputChange(e.target.value, "username")} aria-invalid={!!errors.username} />
                </div>
                <InputError message={errors.username} />
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter email" className="h-11 px-4 rounded-2xl" value={data.email} onChange={e => handleInputChange(e.target.value, "email")} aria-invalid={!!errors.email} />
                </div>
                <InputError message={errors.email} />
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <InputGroup className="h-11 rounded-2xl">
                        <InputGroupInput id="password" type={passwordVisible ? "text" : "password"} placeholder="Enter password" className="pl-4" value={data.password} onChange={e => handleInputChange(e.target.value, "password")} aria-invalid={!!errors.password} />
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
                <InputError message={errors.password} />
                <Button className="w-full mt-3 h-11 rounded-2xl" disabled={loading}>{loading ? <Spinner /> : "Sign Up"}</Button>
            </div>
            <p className="text-center text-sm">Already have an account? <span onClick={handleFormChange} className={`cursor-pointer font-semibold ${loading ? "pointer-events-none" : ""}`}>Sign in</span></p>
        </form>
    )
}

export default SignUpForm