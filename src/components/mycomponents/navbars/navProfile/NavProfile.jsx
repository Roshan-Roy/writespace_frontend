import { useState, useEffect, useRef } from "react"
import { useLayout } from "../../mainLayout/MainLayout"

const NavProfile = () => {
    const { setSidebarOpen } = useLayout()
    const [profileOpen, setProfileOpen] = useState(false)
    const profileDropDownRef = useRef(null)

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

    return (
        <div ref={profileDropDownRef} className="relative w-8.5 h-8.5">
            <div
                className="bg-gray-300 w-full h-full rounded-full lg:hidden"
                onClick={profileOpen ? handleCloseProfile : handleOpenProfileWithSidebarClose}
            />
            <div
                className="bg-gray-300 w-full h-full rounded-full hidden lg:block"
                onClick={profileOpen ? handleCloseProfile : handleOpenProfile}
            />

            <div className={`absolute bg-red-400 top-full translate-y-1.5 -right-1 transition-all ${profileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}>
                Hello
            </div>
        </div>
    )
}

export default NavProfile
