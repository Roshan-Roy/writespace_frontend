import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { MEDIA_URL } from "@/lib/urls"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import api from "@/api/api"
import CustomToast from "../toast/CustomToast"
import toast from "react-hot-toast"
import { CircleX } from "lucide-react"

const FollowUnfollowCard = ({
    id,
    image,
    username,
    is_following,
    my_profile = false,
}) => {
    const [following, setFollowing] = useState(is_following)
    const [loading, setLoading] = useState(false)
    const profileLink = my_profile ? "/my_profile" : `/profile/${id}`

    const handleFollowBtnClick = async () => {
        try {
            setLoading(true)
            await api.post(`follow/${id}/`)
            setFollowing(true)
        } catch (e) {
            toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
        } finally {
            setLoading(false)
        }
    }

    const handleUnFollowBtnClick = async () => {
        try {
            setLoading(true)
            await api.delete(`follow/${id}/`)
            setFollowing(false)
        } catch (e) {
            toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-between py-2 lg:py-3">
            <div className="flex items-center gap-4 lg:gap-6">
                <Link className="block w-12 lg:w-14 aspect-square" to={profileLink}><img src={image ? `${MEDIA_URL}${image}` : "/images/default_avatar.jpg"} alt="profile picture" className="w-full h-full rounded-full" /></Link>
                <Link to={profileLink} className="lg:text-lg">{username}</Link>
            </div>
            {!my_profile && <Button variant={following ? "outline" : "default"} className="w-26 lg:w-28 rounded-full" disabled={loading} onClick={following ? handleUnFollowBtnClick : handleFollowBtnClick}>{loading ? <Spinner /> : following ? "Unfollow" : "Follow"}</Button>}
        </div>
    )
}

export default FollowUnfollowCard