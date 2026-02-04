import { Link } from "react-router"
import { MEDIA_URL } from "@/lib/urls"

const UserCardSearch = ({ id, username, image, is_following }) => {
    return (
        <Link to={`/profile/${id}`} className="flex items-center py-2 md:py-3 gap-4 md:gap-6">
            <div className="w-12 md:w-14 h-12 md:h-14 shrink-0"><img src={image ? `${MEDIA_URL}${image}` : "/images/default_avatar.jpg"} alt="profile picture" className="w-full h-full object-cover rounded-full" /></div>
            <div className="flex flex-col gap-0.5 md:gap-1 min-w-0">
                <span className="md:text-lg truncate">{username}</span>
                {is_following && <span className="text-muted-foreground text-sm">is following</span>}
            </div>
        </Link>
    )
}

export default UserCardSearch