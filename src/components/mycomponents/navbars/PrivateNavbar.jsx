import { Link, NavLink } from "react-router"
import { Menu, Bell, SquarePen } from "lucide-react"
import NavProfile from "./navProfile/NavProfile"
import { useLayout } from "@/contexts/LayoutContext"
import { useNotifications } from "@/contexts/NotificationContext"

const PrivateNavbar = () => {
  const { setSidebarOpen } = useLayout()
  const { count } = useNotifications()

  const notificationsCount = count > 9 ? "9+" : count === 0 ? null : count

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
          <NavLink to="/notifications" className={({ isActive }) => `hidden lg:block relative ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <Bell />
            {notificationsCount && <span className="text-[9px] font-semibold bg-red-600 text-white w-4 h-4 rounded-full absolute top-0 right-0 translate-x-1.5 -translate-y-1.5 flex justify-center items-center">{notificationsCount}</span>}
          </NavLink>
          <NavProfile />
        </div>
      </div>
      <div className="h-14"></div>
    </>
  )
}

export default PrivateNavbar