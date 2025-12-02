import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LockKeyhole } from "lucide-react"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { forgotPasswordSchema } from "@/lib/validation"
import AuthPageWrapper from "@/components/mycomponents/authPageWrapper/AuthPageWrapper"
import toast from "react-hot-toast"
import CustomToast from "@/components/mycomponents/toast/CustomToast"
import { CircleX, MailCheck } from "lucide-react"
import axios from "axios"
import { API_URL } from "@/lib/api"

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: ""
  })
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const disabled = !forgotPasswordSchema.safeParse(data).success

  const forgotPassword = async (data) => {
    try {
      setLoading(true)
      await axios.post(`${API_URL}forgot_password/`, data)
      setEmailSent(true)
    } catch (e) {
      toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
      setLoading(false)
    }
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const result = forgotPasswordSchema.safeParse(data)
    if (!result.success) return
    forgotPassword(result.data)
  }
  return (
    <AuthPageWrapper>
      {emailSent ? (
        <div className="w-18/20 flex flex-col max-w-sm border px-6 sm:px-8 py-8 sm:py-10 rounded-lg gap-3.5 text-center">
          <MailCheck className="self-center w-14 sm:w-16 h-14 sm:h-16" />
          <h2 className="text-lg sm:text-xl font-semibold">Email sent</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-3">If an account exists with this email, a password reset link has been sent.</p>
          <p className="flex gap-3 justify-center"><Link className="self-center text-sm hover:underline font-semibold" to="/">Back to home</Link><span>|</span><a
            className="self-center text-sm hover:underline font-semibold"
            href="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check Gmail
          </a></p>
        </div>
      ) : (
        <form className="w-18/20 flex flex-col max-w-sm border px-6 sm:px-8 py-8 sm:py-10 rounded-lg gap-3.5" onSubmit={handleFormSubmit}>
          <LockKeyhole className="self-center w-14 sm:w-16 h-14 sm:h-16" />
          <h2 className="text-lg sm:text-xl font-semibold text-center">Forgot password?</h2>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" className="h-11 px-4 rounded-2xl" value={data.email} onChange={e => setData(prev => ({ ...prev, email: e.target.value }))} />
          </div>
          <Button className="w-full h-11 mt-1 mb-3 rounded-2xl" disabled={disabled || loading}>{loading ? <Spinner /> : "Reset Password"}</Button>
          <Link className="self-center text-sm hover:underline font-semibold" to="/">Back to home</Link>
        </form>
      )}
    </AuthPageWrapper>
  )
}

export default ForgotPassword