import { Link } from "react-router"
import { Menu } from "lucide-react"

const PrivateNavbar = ({ setOpen }) => {

  const handleToggleNavbar = () => {
    setOpen(e => !e)
  }

  return (
    <>
      <div className="fixed top-0 w-full h-14 border-b flex justify-center bg-background">
        <div className="w-full px-8 flex justify-between">
          <div className="flex items-center gap-4 lg:gap-5">
            <Menu className="text-muted-foreground" onClick={handleToggleNavbar} />
            <Link to="/" className="font-logo text-2xl lg:text-3xl">Writespace</Link>
          </div>
          <div className="bg-green-200">
            profile
          </div>
        </div>
      </div>
      <div className="h-14"></div>
    </>
  )
}

export default PrivateNavbar