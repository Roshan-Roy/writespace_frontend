import { Outlet } from "react-router"
import PublicNavbar from "../navbars/PublicNavbar"
import PrivateNavbar from "../navbars/PrivateNavbar"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import SidebarWrapper from "../sidebarWrapper/SidebarWrapper"

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  if (isAuthenticated) return (
    <>
      <PrivateNavbar setOpen={setOpen} />
      <SidebarWrapper setOpen={setOpen} open={open}><Outlet /></SidebarWrapper>
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