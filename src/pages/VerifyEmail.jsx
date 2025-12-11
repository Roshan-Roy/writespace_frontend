import AuthPageWrapper from "@/components/mycomponents/authPageWrapper/AuthPageWrapper"
import { useParams, Link } from "react-router"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { API_URL } from "@/lib/urls"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import { Spinner } from "@/components/ui/spinner"
import { Link2Off, BadgeCheck } from "lucide-react"

const VerifyEmail = () => {
  const { uidb64, token } = useParams()
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState(false)
  const [validLink, setValidLink] = useState(true)
  const hasFetched = useRef(false)

  const verifyEmail = async () => {
    try {
      await axios.get(`${API_URL}verify_email/${uidb64}/${token}/`)
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
    verifyEmail()
  }

  useEffect(() => {
    if (!hasFetched.current) {
      verifyEmail()
      hasFetched.current = true
    }
  }, [])

  if (pageLoading) return <div className="w-full h-dvh flex justify-center items-center"><Spinner className="size-10 sm:size-12" /></div>
  if (pageError) return <ErrorPage retryFn={handleReloadData} />
  return (
    <AuthPageWrapper>
      {validLink ? (
        <div className="w-18/20 flex flex-col max-w-sm border px-6 sm:px-8 py-8 sm:py-10 rounded-lg gap-3.5 text-center">
          <BadgeCheck className="self-center w-14 sm:w-16 h-14 sm:h-16" />
          <h2 className="text-lg sm:text-xl font-semibold mb-3">Email Verified</h2>
          <Link className="self-center text-sm hover:underline font-semibold" to="/">Back to home</Link>
        </div>
      ) : (
        <div className="w-18/20 flex flex-col max-w-sm border px-6 sm:px-8 py-8 sm:py-10 rounded-lg gap-3.5 text-center">
          <Link2Off className="self-center w-14 sm:w-16 h-14 sm:h-16" />
          <h2 className="text-lg sm:text-xl font-semibold mb-3">Invalid link</h2>
          <Link className="self-center text-sm hover:underline font-semibold" to="/">Back to home</Link>
        </div>
      )}
    </AuthPageWrapper>
  )
}

export default VerifyEmail