import { Link, NavLink } from "react-router"
import { Menu, Bell, SquarePen } from "lucide-react"
import NavProfile from "./navProfile/NavProfile"
import { useLayout } from "@/contexts/LayoutContext"

const PrivateNavbar = () => {
  const { setSidebarOpen } = useLayout()

  const handleToggleSidebar = () => {
    setSidebarOpen(e => !e)
  }

  return (
    <>
      <div className="fixed z-50 top-0 w-full h-14 border-b flex bg-background pl-8 pr-6 lg:pr-8 justify-between">
        <div className="flex items-center gap-4">
          <Menu className="text-muted-foreground" onClick={handleToggleSidebar} />
          <Link to="/" className="font-logo text-3xl">Writespace</Link>
        </div>
        <div className="flex items-center gap-8">
          <NavLink to="/write" className={({ isActive }) => `hidden lg:flex items-center gap-2 ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <SquarePen />
            <span className="text-sm">Write</span>
          </NavLink>
          <NavLink to="/notifications" className={({ isActive }) => `hidden lg:block ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <Bell />
          </NavLink>
          <NavProfile />
        </div>
      </div>
      <div className="h-14"></div>
    </>
  )
}

export default PrivateNavbar