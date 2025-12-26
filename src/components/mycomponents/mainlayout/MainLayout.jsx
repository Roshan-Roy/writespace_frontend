import { Outlet } from "react-router"
import PublicNavbar from "../navbars/PublicNavbar"
import PrivateNavbar from "../navbars/PrivateNavbar"
import { useAuth } from "@/contexts/AuthContext"
import { LayoutProvider } from "@/contexts/LayoutContext"
import SidebarWrapper from "../sidebarWrapper/SidebarWrapper"


const MainLayout = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <>
        <PublicNavbar />
        <Outlet />
      </>
    )
  }

  return (
    <LayoutProvider>
      <PrivateNavbar />
      <SidebarWrapper>
        <Outlet />
      </SidebarWrapper>
    </LayoutProvider>
  )
}

export default MainLayout
