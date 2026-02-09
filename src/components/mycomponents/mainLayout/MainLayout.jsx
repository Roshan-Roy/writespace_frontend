import { Outlet } from "react-router"
import PublicNavbar from "../navbars/PublicNavbar"
import PrivateNavbar from "../navbars/PrivateNavbar"
import { useAuth } from "@/contexts/AuthContext"
import { LayoutProvider } from "@/contexts/LayoutContext"
import SidebarWrapper from "../sidebarWrapper/SidebarWrapper"
import { NotificationProvider } from "@/contexts/NotificationContext"
import ScrollToTop from "../scrollToTop/ScrollToTop"

const MainLayout = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <ScrollToTop />
      {!isAuthenticated ? (
        <>
          <PublicNavbar />
          <Outlet />
        </>
      ) : (
        <LayoutProvider>
          <NotificationProvider>
            <PrivateNavbar />
            <SidebarWrapper>
              <Outlet />
            </SidebarWrapper>
          </NotificationProvider>
        </LayoutProvider>
      )}
    </>
  )
}

export default MainLayout
