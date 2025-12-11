import AuthPageWrapper from "@/components/mycomponents/authPageWrapper/AuthPageWrapper"
import { useParams, Link } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "@/lib/urls"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import { EyeOff, Eye, CircleX, ShieldCheck, Link2Off } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { resetPasswordSchema } from "@/lib/validation"
import toast from "react-hot-toast"
import CustomToast from "@/components/mycomponents/toast/CustomToast"

const ResetPassword = () => {
    const { uidb64, token } = useParams()
    const [data, setData] = useState({
        password: "",
        cpassword: ""
    })
    const [pageLoading, setPageLoading] = useState(true)
    const [pageError, setPageError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [validLink, setValidLink] = useState(true)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [passwordChanged, setPasswordChaged] = useState(false)
    const disabled = !resetPasswordSchema.safeParse(data).success

    const handleInputChange = (value, fieldName) => {
        setData(prevData => ({ ...prevData, [fieldName]: value }))
    }
    const handleTogglePasswordVisibility = () => {
        setPasswordVisible(prevVisible => !prevVisible)
    }
    const resetPassword = async (data) => {
        try {
            setLoading(true)
            await axios.post(`${API_URL}reset_password/${uidb64}/${token}/`, data)
            setPasswordChaged(true)
        } catch (e) {
            toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
            setLoading(false)
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const result = resetPasswordSchema.safeParse(data)
        if (!result.success) return
        resetPassword({ password: result.data.password })
    }
    const handleCheckLink = async () => {
        try {
            await axios.get(`${API_URL}reset_password/${uidb64}/${token}/`)
            setPageLoading(false)
        } catch (e) {
            const status = e.response?.status
            if (status === 400) {
                setValidLink(false)
            } else {
                setPageError(true)
            }
        } finally {
            setPageLoading(false)
        }
    }
    const handleReloadData = () => {
        setPageError(false)
        setPageLoading(true)
        handleCheckLink()
    }

    useEffect(() => {
        handleCheckLink()
    }, [])

    if (pageLoading) return <div className="w-full h-dvh flex justify-center items-center"><Spinner className="size-10 sm:size-12" /></div>
    if (pageError) return <ErrorPage retryFn={handleReloadData} />
    return (
        <AuthPageWrapper>
            {validLink ? (passwordChanged ? (
                <div className="w-18/20 flex flex-col max-w-sm border px-6 sm:px-8 py-8 sm:py-10 rounded-lg gap-3.5 text-center">
                    <ShieldCheck className="self-center w-14 sm:w-16 h-14 sm:h-16" />
                    <h2 className="text-lg sm:text-xl font-semibold">Password changed</h2>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3">Your password has been updated. You can now sign in with your new credentials.</p>
                    <Link className="self-center text-sm hover:underline font-semibold" to="/">Back to home</Link>
                </div>
            ) : (
                <form className="w-18/20 flex flex-col max-w-sm border px-6 sm:px-8 py-8 sm:py-10 rounded-lg gap-3.5" onSubmit={handleFormSubmit}>
                    <h2 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-5">Reset password</h2>
                    <div className="flex flex-col gap-3.5">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">New password</Label>
                            <InputGroup className="h-11 rounded-2xl">
                                <InputGroupInput id="password" type={passwordVisible ? "text" : "password"} placeholder="Enter new password" className="pl-4" value={data.password} onChange={e => handleInputChange(e.target.value, "password")} />
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
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="cpassword">Confirm password</Label>
                            <Input id="cpassword" type={passwordVisible ? "text" : "password"} placeholder="Re-enter new password" className="h-11 px-4 rounded-2xl" value={data.cpassword} onChange={e => handleInputChange(e.target.value, "cpassword")} />
                        </div>
                    </div>
                    <Button className="w-full h-11 my-3 rounded-2xl" disabled={disabled || loading}>{loading ? <Spinner /> : "Reset Password"}</Button>
                    <Link className="self-center text-sm hover:underline font-semibold" to="/">Back to home</Link>
                </form>
            )) : (
                <div className="w-18/20 flex flex-col max-w-sm border px-6 sm:px-8 py-8 sm:py-10 rounded-lg gap-3.5 text-center">
                    <Link2Off className="self-center w-14 sm:w-16 h-14 sm:h-16" />
                    <h2 className="text-lg sm:text-xl font-semibold mb-3">Invalid link</h2>
                    <Link className="self-center text-sm hover:underline font-semibold" to="/">Back to home</Link>
                </div>
            )}
        </AuthPageWrapper>
    )
}

export default ResetPassword