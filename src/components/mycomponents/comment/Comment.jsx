import { MEDIA_URL } from "@/lib/urls"
import { MdDelete } from "react-icons/md"
import { useState } from "react"
import { Check, X, CircleX } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import api from "@/api/api"
import CustomToast from "../toast/CustomToast"
import toast from "react-hot-toast"
import { Link } from "react-router"
import { formatDate } from "@/lib/utils"


const Comment = ({ id, profile, content, removeResponse, created_at, my_comment }) => {
    const [loading, setLoading] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)

    const profileLink = `/profile/${profile.id}`

    const handleEnableDeleteConfirmation = () => {
        setDeleteConfirmation(true)
    }
    const handleDisableDeleteConfirmation = () => {
        setDeleteConfirmation(false)
    }
    const handleDeleteResponse = async () => {
        try {
            setLoading(true)
            await api.delete(`comment_delete/${id}/`)
            removeResponse(id)
        } catch (e) {
            setLoading(false)
            toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
        }
    }
    return (
        <div className="border-b py-8 lg:py-10">
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                    <Link to={profileLink} className="block self-start w-10 lg:w-12 aspect-square shrink-0"><img src={profile.image ? `${MEDIA_URL}${profile.image}` : "/images/default_avatar.jpg"} alt="profile picture" className="w-full h-full rounded-full" /></Link>
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <Link to={profileLink} className="lg:text-lg truncate">{profile.username}</Link>
                        <span className="text-xs lg:text-sm text-foreground/60 truncate">{formatDate(created_at)}</span>
                    </div>
                </div>
                {my_comment && (
                    loading ? (
                        <div className="w-6.5 h-6.5 flex justify-center items-center bg-muted rounded-sm">
                            <Spinner className="size-3" />
                        </div>
                    ) : deleteConfirmation ? (
                        <div className="flex gap-1.5">
                            <div
                                className="w-6.5 h-6.5 flex justify-center items-center bg-muted text-foreground/80 rounded-sm cursor-pointer"
                                onClick={handleDisableDeleteConfirmation}
                            >
                                <X size="16" />
                            </div>
                            <div
                                className="w-6.5 h-6.5 flex justify-center items-center bg-destructive text-white rounded-sm cursor-pointer"
                                onClick={handleDeleteResponse}
                            >
                                <Check size="16" />
                            </div>
                        </div>
                    ) : (
                        <div className="w-6.5 h-6.5 flex justify-center items-center text-foreground/80 cursor-pointer">
                            <MdDelete
                                className="text-xl"
                                onClick={handleEnableDeleteConfirmation}
                            />
                        </div>
                    )
                )}
            </div>
            <p className="mt-3.5 lg:mt-4.5 lg:text-lg leading-relaxed">{content}</p>
        </div>
    )
}

export default Comment