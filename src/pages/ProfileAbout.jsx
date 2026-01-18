import { useEffect, useState } from "react"
import api from "@/api/api"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import { Skeleton } from "@/components/ui/skeleton"
import { useParams } from "react-router"

const ProfileAbout = () => {
  const { profile_id } = useParams()
  const [data, setData] = useState("")
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState(false)

  const getAbout = async () => {
    try {
      const response = await api.get(`profile/${profile_id}/`)
      const about = response.data.data.profile.about
      setData(about)
    } catch (e) {
      setPageError(true)
    } finally {
      setPageLoading(false)
    }
  }
  const handleReloadData = () => {
    setPageError(false)
    setPageLoading(true)
    getAbout()
  }

  useEffect(() => {
    getAbout()
  }, [])

  if (pageLoading) return (
    <div className="pt-6 md:pt-8 pb-12 md:pb-14 flex flex-col gap-4">
      <Skeleton className="h-6" />
      <Skeleton className="h-6" />
      <Skeleton className="h-6 w-3/4" />
    </div>
  )
  if (pageError) return <ErrorPage retryFn={handleReloadData} className="h-auto py-18 md:py-20" />
  return (
    <div className="pt-6 md:pt-8 pb-12 md:pb-14">
      <p className="leading-loose md:text-lg wrap-anywhere">{data || <span className="text-muted-foreground">No about</span>}</p>
    </div>
  )
}

export default ProfileAbout