import { Outlet } from "react-router"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router"
import FollowCountProfile from "@/components/mycomponents/followCountProfile/FollowCountProfile"
import { MyProfileLinks } from "@/constants/ProfileLinks"
import { useState } from "react"
import LoadingPage from "@/components/mycomponents/loadingPage/LoadingPage"

const MyProfile = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  if (loading) return <LoadingPage className="h-[calc(100dvh-56px)]" />
  return (
    <div className="mx-auto w-17/20 max-w-4xl">
      <div className="pt-6 pb-6 lg:pt-10 lg:pb-8 flex flex-col gap-4.5 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-6 lg:gap-8">
          <img src="/images/default_avatar.jpg" alt="profle" className="w-20 lg:w-28 h-20 lg:h-28 rounded-full" />
          <div className="flex-1 flex flex-col gap-2 lg:gap-4">
            <span className="font-semibold text-lg md:text-2xl lg:text-4xl break-all leading-tight">Roshan</span>
            <div className="flex gap-4">
              <FollowCountProfile text="Followers" count={123} />
              <FollowCountProfile text="Following" count={100} />
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