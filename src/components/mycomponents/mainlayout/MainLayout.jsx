import { Outlet } from "react-router"
import PublicNavbar from "../navbars/PublicNavbar"
import PrivateNavbar from "../navbars/PrivateNavbar"
import { useAuth } from "@/contexts/AuthContext"
import { createContext, useContext, useState } from "react"
import SidebarWrapper from "../sidebarWrapper/SidebarWrapper"

const LayoutContext = createContext()
export const useLayout = () => useContext(LayoutContext)

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <>
        <PublicNavbar />
        <Outlet />
      </>
    )
  }

  return (
    <LayoutContext.Provider value={{
      sidebarOpen,
      setSidebarOpen
    }}>
      <PrivateNavbar />
      <SidebarWrapper>
        <Outlet />
      </SidebarWrapper>
    </LayoutContext.Provider>
  )
}

export default MainLayout
