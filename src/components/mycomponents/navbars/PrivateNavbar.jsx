import { Link } from "react-router"
import { Menu } from "lucide-react"

const PrivateNavbar = ({ setSidebarOpen }) => {

  const handleToggleSidebar = () => {
    setSidebarOpen(e => !e)
  }

  return (
    <>
      <div className="fixed top-0 w-full h-14 border-b flex bg-background px-8 justify-between">
        <div className="flex items-center gap-4">
          <Menu className="text-muted-foreground" onClick={handleToggleSidebar} />
          <Link to="/" className="font-logo text-3xl">Writespace</Link>
        </div>
        <div className="bg-green-200">
          profile
        </div>
      </div>
      <div className="h-14"></div>
    </>
  )
}

export default PrivateNavbar