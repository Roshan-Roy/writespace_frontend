import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { AuthModal } from "@/components/modals/authmodal/AuthModal"
import { useState } from "react"

const Navbar = () => {
  const [openSignInModal, setOpenSignInModal] = useState(false)
  const [openSignUpModal, setOpenSignUpModal] = useState(false)
  return (
    <>
      <div className="flex justify-center border-b border-b-foreground fixed w-full bg-background-home">
        <div className="w-17/20 flex justify-between items-center h-20 gap-2">
          <Link to="/" className="font-logo text-2xl lg:text-3xl">Writespace</Link>
          <div className="flex gap-6 items-center">
            <AuthModal open={openSignInModal} setOpen={setOpenSignInModal} />
            <Button className="rounded-full text-xs lg:text-sm lg:h-10 lg:px-6">Get started</Button>
          </div>
        </div>
      </div>
      <div className="h-20"></div>
    </>
  )
}

export default Navbar