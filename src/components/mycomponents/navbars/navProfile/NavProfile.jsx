import { useState, useEffect, useRef } from "react"
import { useLayout } from "../../mainLayout/MainLayout"
import axios from "axios"
import { MEDIA_URL, API_URL } from "@/lib/urls"
import { Link } from "react-router"
import NavProfileDropDownSkeleton from "./NavProfileDropDownSkeleton"
import { Bell, SquarePen } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import ToggleThemeButtonNavbar from "../../switchThemeButtons/ToggleThemeButtonNavbar"
import SignoutButton from "../../signoutButton/SignoutButton"

const NavProfile = () => {
    const { setSidebarOpen } = useLayout()
    const [profileOpen, setProfileOpen] = useState(false)
    const profileDropDownRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState(null)


    const handleOpenProfileWithSidebarClose = () => {
        setProfileOpen(true)
        setSidebarOpen(false)
    }
    const handleOpenProfile = () => {
        setProfileOpen(true)
    }
    const handleCloseProfile = () => {
        setProfileOpen(false)
    }

    useEffect(() => {
        if (!profileOpen) return

        const handleScroll = () => {
            setProfileOpen(false)
        }

        const handleClickOutside = (event) => {
            if (profileDropDownRef.current && !profileDropDownRef.current.contains(event.target)) {
                setProfileOpen(false)
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
        }
    }, [profileOpen])

    useEffect(() => {

    }, [])

    return (
        <div ref={profileDropDownRef} className={`relative w-8 h-8 rounded-full ${profileOpen ? "ring-1 ring-foreground ring-offset-3 ring-offset-background" : ""}`}>
            <img
                className="w-full h-full rounded-full lg:hidden"
                onClick={profileOpen ? handleCloseProfile : handleOpenProfileWithSidebarClose}
                src={data?.profile.image ? `${MEDIA_URL}${data.profile.image}` : "/images/default_avatar.jpg"} alt="profile picture"
            />
            <img
                className="w-full h-full rounded-full hidden lg:block"
                onClick={profileOpen ? handleCloseProfile : handleOpenProfile}
                src={data?.profile.image ? `${MEDIA_URL}${data.profile.image}` : "/images/default_avatar.jpg"} alt="profile picture"
            />

            <div className={`absolute bg-popover top-full translate-y-2.5 -right-2 transition-all shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] rounded-md dark:shadow-none w-58 sm:w-64 ${profileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
                {loading ? <NavProfileDropDownSkeleton /> : (
                    <>
                        <Link className="flex items-center gap-4 py-4 px-6 text-foreground/80 hover:text-foreground" onClick={handleCloseProfile} to="/profile">
                            <img className="w-12 h-12 rounded-full" src={data?.profile.image ? `${MEDIA_URL}${data.profile.image}` : "/images/default_avatar.jpg"} alt="profile picture" />
                            <div className="flex-1 flex flex-col gap-1 min-w-0">
                                <span className="truncate">Roshan</span>
                                <span className="text-xs">View profile</span>
                            </div>
                        </Link>
                        <Link className="flex gap-4 items-center px-6 py-2 text-foreground/70 hover:text-foreground" onClick={handleCloseProfile} to="/write">
                            <SquarePen />
                            <span>Write</span>
                        </Link>
                        <Link className="flex gap-4 items-center px-6 py-2 text-foreground/70 hover:text-foreground" onClick={handleCloseProfile} to="/notifications">
                            <Bell />
                            <span>Notifications</span>
                        </Link>
                        <Separator className="mt-4" />
                        <ToggleThemeButtonNavbar />
                        <Separator />
                        <SignoutButton />
                    </>
                )}
            </div>
        </div>
    )
}

export default NavProfile
