import { Link } from "react-router"
import { Menu } from "lucide-react"
import NavProfile from "./navProfile/NavProfile"
import { useLayout } from "../mainLayout/MainLayout"

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
        <div className="flex items-center">
          <NavProfile />
        </div>
      </div>
      <div className="h-14"></div>
    </>
  )
}

export default PrivateNavbar