import { Link } from "react-router"
import { MEDIA_URL } from "@/lib/urls"

const SidebarFollowingCard = ({ id, username, image }) => {
    return (
        <Link to={`/profile/${id}`} className="flex items-center gap-4 py-1">
            <img src={image ? `${MEDIA_URL}${image}` : "/images/default_avatar.jpg"} className="w-6 h-6 rounded-full object-cover" alt="profile picture" />
            <span className="truncate">{username}</span>
        </Link>
    )
}

export default SidebarFollowingCard