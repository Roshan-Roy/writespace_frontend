import { Link, NavLink } from "react-router"
import { Menu, Bell, SquarePen, SearchIcon } from "lucide-react"
import NavProfile from "./navProfile/NavProfile"
import { useLayout } from "@/contexts/LayoutContext"
import { useNotifications } from "@/contexts/NotificationContext"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { useState, useRef, useEffect } from "react"
import { useNavigate, useLocation } from "react-router"

const PrivateNavbar = () => {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const { setSidebarOpen } = useLayout()
  const { count } = useNotifications()
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const notificationsCount = count > 9 ? "9+" : count === 0 ? null : count

  const handleToggleSidebar = () => {
    setSidebarOpen(e => !e)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      navigate("/search")
      return
    }

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`)
  }

  useEffect(() => {
    const wasSearch = prevPath.current.startsWith("/search")
    const isSearch = location.pathname.startsWith("/search")

    if (wasSearch && !isSearch) {
      setQuery("")
    }

    prevPath.current = location.pathname
  }, [location.pathname])

  return (
    <>
      <div className="fixed z-50 top-0 w-full h-14 border-b flex bg-background pl-8 pr-6 lg:pr-8 justify-between gap-1">
        <div className="flex items-center gap-4 min-w-0">
          <Menu className="text-muted-foreground shrink-0" onClick={handleToggleSidebar} />
          <Link to="/" className="lg:hidden font-logo text-3xl truncate" onClick={handleCloseSidebar}>Writespace</Link>
          <Link to="/" className="hidden lg:inline font-logo text-3xl truncate">Writespace</Link>
          <div className="hidden md:block ml-6 w-60">
            <form onSubmit={handleSearch}>
              <InputGroup className="rounded-full">
                <InputGroupInput placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
                <InputGroupAddon>
                  <SearchIcon />
                </InputGroupAddon>
              </InputGroup>
            </form>
          </div>
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
          <div className="flex items-center gap-5">
            <NavLink to="/search" className={({ isActive }) => `md:hidden ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`} onClick={handleCloseSidebar}><SearchIcon /></NavLink>
            <NavProfile />
          </div>
        </div>
      </div>
      <div className="h-14"></div>
    </>
  )
}

export default PrivateNavbar