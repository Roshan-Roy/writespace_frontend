import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import api from "@/api/api"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import CustomToast from "@/components/mycomponents/toast/CustomToast"
import toast from "react-hot-toast"
import { CircleX } from "lucide-react"

const MyProfileAbout = () => {
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [defaultAbout, setDefaultAbout] = useState("")
  const [data, setData] = useState("")
  const [editing, setEditing] = useState(false)
  const textAreaRef = useRef(null)

  const handleEnableEdit = () => {
    setData(defaultAbout)
    setEditing(true)
  }
  const handleDisableEdit = () => {
    setEditing(false)
  }
  const handleInputChange = (value) => {
    setData(value)
  }

  const updateAbout = async () => {
    try {
      setLoading(true)
      const response = await api.patch("profile_update/", { about: data })
      setDefaultAbout(response.data.data.about)
      handleDisableEdit()
    } catch (e) {
      toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
    } finally {
      setLoading(false)
    }
  }
  const getAbout = async () => {
    try {
      const response = await api.get("my_profile/")
      const about = response.data.data.profile.about
      setData(about)
      setDefaultAbout(about)
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

  useLayoutEffect(() => {
    if (!editing) return

    const el = textAreaRef.current
    if (!el) return

    el.focus()
    el.setSelectionRange(el.value.length, el.value.length)
  }, [editing])

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
      <div className={editing ? "block" : "hidden"}>
        <Textarea ref={textAreaRef} className="p-0 min-h-0 rounded-none dark:bg-transparent border-none shadow-none leading-loose md:text-lg" value={data} onChange={e => handleInputChange(e.target.value)} />
        <div className="mt-8 md:mt-10 flex justify-end gap-2">
          <Button className="rounded-full h-10 w-22" variant="outline" onClick={handleDisableEdit} disabled={loading}>Cancel</Button>
          <Button className="rounded-full h-10 w-22" onClick={updateAbout} disabled={loading}>{loading ? <Spinner /> : "Save"}</Button>
        </div>
      </div>
      <div className={(defaultAbout && !editing) ? "block" : "hidden"}>
        <p className="leading-loose md:text-lg wrap-anywhere">{defaultAbout}</p>
        <div className="mt-8 md:mt-10 flex justify-end gap-2">
          <Button className="rounded-full h-10 w-22" variant="outline" onClick={handleEnableEdit}>Edit</Button>
        </div>
      </div>
      <div className={`bg-muted/50 text-center py-14 md:py-16 px-10 md:px-12 rounded-sm ${(!defaultAbout && !editing) ? "block" : "hidden"}`}>
        <p className="font-semibold md:text-lg">Tell the world about yourself</p>
        <p className="text-sm md:text-base leading-relaxed mt-5 mb-7">Here's where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more</p>
        <Button className="rounded-full px-6 h-10" onClick={handleEnableEdit}>Get started</Button>
      </div>
    </div>
  )
}

export default MyProfileAbout