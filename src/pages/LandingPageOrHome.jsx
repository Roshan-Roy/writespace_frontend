import { useAuth } from "@/contexts/AuthContext"
import Home from "./Home"
import LandingPage from "./LandingPage"

const LandingPageOrHome = () => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? <Home /> : <LandingPage />
}

export default LandingPageOrHome