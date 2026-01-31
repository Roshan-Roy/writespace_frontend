import { Link } from "react-router"
import { MEDIA_URL } from "@/lib/urls"
import { formatDate } from "@/lib/utils"

const NotificationCard = ({ actor, story_id, created_at, notification_type }) => {
    const messages = {
        "like": "liked your",
        "comment": "responded to your",
        "story": "posted a new",
        "follow": "started following you"
    }

    const message = messages[notification_type]
    const profileLink = `/profile/${actor.id}`
    const storyLink = story_id ? `/story/${story_id}` : null

    return (
        <div className="flex items-center gap-3 lg:gap-4 py-2">
            <Link to={profileLink} className="block self-start w-10 lg:w-12 h-10 lg:h-12 shrink-0"><img src={actor.image ? `${MEDIA_URL}${actor.image}` : "/images/default_avatar.jpg"} alt="profile picture" className="w-full h-full object-cover rounded-full" /></Link>
            <div className="flex flex-col gap-1">
                <p className="wrap-anywhere"><Link to={profileLink} className="lg:text-lg">{actor.username}</Link> <span className="text-foreground/70">{message}</span> {storyLink && <Link to={storyLink}>story</Link>}</p>
                <span className="text-xs lg:text-sm text-foreground/60 truncate">{formatDate(created_at)}</span>
            </div>
        </div>
    )
}

export default NotificationCard