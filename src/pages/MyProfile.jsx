import { Outlet } from "react-router"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router"
import FollowCountProfile from "@/components/mycomponents/followCountProfile/FollowCountProfile"
import { MyProfileLinks } from "@/constants/ProfileLinks"
import { useEffect, useState } from "react"
import LoadingPage from "@/components/mycomponents/loadingPage/LoadingPage"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import api from "@/api/api"
import { MEDIA_URL } from "@/lib/urls"

const MyProfile = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getMyProfileData = async () => {
    try {
      const response = await api.get("my_profile/")
      setData(response.data.data)
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleReloadData = () => {
    setError(false)
    setLoading(true)
    getMyProfileData()
  }

  useEffect(() => {
    getMyProfileData()
  }, [])

  if (loading) return <LoadingPage className="h-[calc(100dvh-56px)]" />
  if (error) return <ErrorPage className="h-[calc(100dvh-56px)]" retryFn={handleReloadData} />
  return (
    <div className="mx-auto w-17/20 max-w-4xl">
      <div className="pt-6 pb-6 lg:pt-10 lg:pb-8 flex flex-col gap-4.5 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-6 lg:gap-8">
          <img src={data.profile.image ? `${MEDIA_URL}${data.profile.image}` : "/images/default_avatar.jpg"} alt="profile picture" className="w-20 lg:w-28 h-20 lg:h-28 rounded-full" />
          <div className="flex-1 flex flex-col gap-2 lg:gap-4">
            <span className="font-semibold text-lg md:text-2xl lg:text-4xl break-all leading-tight">{data.username}</span>
            <div className="flex gap-4 lg:gap-4.5">
              <FollowCountProfile text="Followers" count={data.profile.followers_count} />
              <FollowCountProfile text="Following" count={data.profile.following_count} />
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full md:w-60 rounded-2xl">Edit Profile</Button>
      </div>
      <div className="flex">
        {MyProfileLinks.map(e => {
          return (
            <>
              <NavLink to={e.route} className={({ isActive }) => `pb-3 lg:pb-4 border-b-2 ${isActive ? "border-b-foreground text-foreground" : "border-muted text-foreground/70 hover:text-foreground"}`} end={e.route === "."}>{e.label}</NavLink>
              <div className="border-b-2 border-muted w-6 lg:w-8"></div>
            </>
          )
        })}
        <div className="border-b-2 border-muted flex-1"></div>
      </div>
      <Outlet />
    </div>
  )
}

export default MyProfile