import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { MEDIA_URL } from "@/lib/urls"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"
import api from "@/api/api"
import CustomToast from "../toast/CustomToast"
import toast from "react-hot-toast"
import { CircleX } from "lucide-react"

const MyFollowingCard = ({
    id,
    image,
    username,
    filterFollowingById
}) => {
    const [loading, setLoading] = useState(false)

    const handleUnfollowBtnClick = async () => {
        try {
            setLoading(true)
            await api.delete(`follow/${id}/`)
            filterFollowingById(id)
        } catch (e) {
            setLoading(false)
            toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
        }
    }

    return (
        <div className="flex items-center justify-between py-2 lg:py-3">
            <div className="flex items-center gap-4 lg:gap-6">
                <Link className="block w-12 lg:w-14 aspect-square" to="/"><img src={image ? `${MEDIA_URL}${image}` : "/images/default_avatar.jpg"} alt="profile picture" className="w-full h-full rounded-full" /></Link>
                <Link to="/" className="lg:text-lg">{username}</Link>
            </div>
            <Button variant="outline" className="w-26 lg:w-28 rounded-full" disabled={loading} onClick={handleUnfollowBtnClick}>{loading ? <Spinner /> : "Unfollow"}</Button>
        </div>
    )
}

export default MyFollowingCard 