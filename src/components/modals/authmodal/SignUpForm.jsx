import { DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "./InputError"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { signupSchema, formatErrors } from "@/lib/validation"
import { API_URL } from "@/lib/api"
import axios from "axios"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"


const SignUpForm = ({ setOpenModal, setDisableClosing }) => {
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
    const [loading, setLoading] = useState(false)

    const handleFormChange = () => {
        setOpenModal("signin")
    }

    const handleInputChange = (value, fieldName) => {
        setData(prevData => ({ ...prevData, [fieldName]: value }))
        setErrors(preErrors => ({ ...preErrors, [fieldName]: "" }))
    }

    const sendData = async (data) => {
        try {
            setDisableClosing(true)
            setLoading(true)
            await axios.post(`${API_URL}signup/`, data);
            setOpenModal(null)
            toast.success("An email has been sent")
        } catch (e) {
            const status = e.response?.status
            if (status !== 400) {
                toast.error("An error occurred")
            } else {
                const { username, email } = e.response.data
                setErrors(prev => ({
                    ...prev,
                    username: Array.isArray(username) ? username[0] : "",
                    email: Array.isArray(email) ? email[0] : ""
                }))
            }
            setLoading(false)
        } finally {
            setDisableClosing(false)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const result = signupSchema.safeParse(data);
        if (result.success) {
            setErrors(prevErrors => ({ ...prevErrors, email: "", username: "" }));
            sendData(result.data)
        } else {
            setErrors(prevErrors => ({ ...prevErrors, ...formatErrors(result.error.issues) }));
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
                    <Input id="password" type="password" placeholder="Enter password" className="h-11 px-4 rounded-2xl" value={data.password} onChange={e => handleInputChange(e.target.value, "password")} aria-invalid={!!errors.password} />
                </div>
                <InputError message={errors.password} />
                <Button className="w-full mt-3 h-11 rounded-2xl" disabled={loading}>{loading ? <Spinner /> : "Sign Up"}</Button>
            </div>
            <p className="text-center text-sm">Already have an account? <u onClick={handleFormChange} className={`cursor-default ${loading ? "pointer-events-none" : ""}`}>Sign in</u></p>
        </form>
    )
}

export default SignUpForm