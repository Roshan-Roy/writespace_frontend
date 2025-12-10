import { Outlet } from "react-router"
import PublicNavbar from "../navbars/PublicNavbar"
import PrivateNavbar from "../navbars/PrivateNavbar"
import { useAuth } from "@/contexts/AuthContext"
import { useState, useRef, useEffect } from "react"
import SidebarWrapper from "../sidebarWrapper/SidebarWrapper"

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const ableToCloseRef = useRef(false)

  useEffect(() => {
    ableToCloseRef.current = window.innerWidth >= 1024

    const handleResize = () => {
      const isLarge = window.innerWidth >= 1024
      if (!isLarge && ableToCloseRef.current) {
        setSidebarOpen(false)
        ableToCloseRef.current = false
      }
      if (isLarge) {
        ableToCloseRef.current = true
      }
    };
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (isAuthenticated) return (
    <>
      <PrivateNavbar setSidebarOpen={setSidebarOpen} />
      <SidebarWrapper setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}><Outlet /></SidebarWrapper>
    </>
  )
  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  )
}

export default MainLayout