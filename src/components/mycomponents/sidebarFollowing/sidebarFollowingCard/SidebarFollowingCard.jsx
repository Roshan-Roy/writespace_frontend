import { Link } from "react-router"
import { MEDIA_URL } from "@/lib/urls"
import { useLayout } from "@/contexts/LayoutContext"

const SidebarFollowingCard = ({ id, username, image }) => {
    const { setSidebarOpen } = useLayout()

    const handleCloseSidebar = () => {
        setSidebarOpen(false)
    }

    return (
        <>
            <Link to={`/profile/${id}`} className="lg:hidden flex items-center gap-4 py-1" onClick={handleCloseSidebar}>
                <img src={image ? `${MEDIA_URL}${image}` : "/images/default_avatar.jpg"} className="w-6 h-6 rounded-full object-cover" alt="profile picture" />
                <span className="truncate">{username}</span>
            </Link>
            <Link to={`/profile/${id}`} className="hidden lg:flex items-center gap-4 py-1">
                <img src={image ? `${MEDIA_URL}${image}` : "/images/default_avatar.jpg"} className="w-6 h-6 rounded-full object-cover" alt="profile picture" />
                <span className="truncate">{username}</span>
            </Link>
        </>

    )
}

export default SidebarFollowingCard