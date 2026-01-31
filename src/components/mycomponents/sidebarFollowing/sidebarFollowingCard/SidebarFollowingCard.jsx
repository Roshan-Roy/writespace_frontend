import { Link } from "react-router"

const SidebarFollowingCard = () => {
    return (
        <Link className="flex items-center gap-4">
            <img className="w-6 h-6 rounded-full object-cover" alt="profile image" />
            <span>roshan</span>
        </Link>
    )
}

export default SidebarFollowingCard