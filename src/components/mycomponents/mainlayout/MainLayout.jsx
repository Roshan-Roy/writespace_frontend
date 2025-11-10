import { Outlet } from "react-router"
import Navbar from "../navbar/Navbar"

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLayout