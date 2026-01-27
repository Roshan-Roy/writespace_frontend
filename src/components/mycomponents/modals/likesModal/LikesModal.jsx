import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"

import FollowUnfollowCard from "../../followCards/FollowUnfollowCard"
import { useAuth } from "@/contexts/AuthContext"

const LikesModal = ({ children, data, setData }) => {
    const { auth: { user } } = useAuth()

    const handleFollowId = (id) => {
        setData(prev => ({
            ...prev,
            likes: prev.likes.map(profile =>
                profile.id === id
                    ? { ...profile, is_following: true }
                    : profile
            )
        }))
    }

    const handleUnfollowId = (id) => {
        setData(prev => ({
            ...prev,
            likes: prev.likes.map(profile =>
                profile.id === id
                    ? { ...profile, is_following: false }
                    : profile
            )
        }))
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="cursor-pointer">{children}</span>
            </DialogTrigger>

            <DialogContent className="px-2 py-6 gap-6">
                <DialogHeader className="sm:text-center">
                    <DialogTitle className="text-xl">{data.length} {data.length === 1 ? "Like" : "Likes"}</DialogTitle>
                </DialogHeader>

                <div className="min-w-0 overflow-y-auto max-h-[50vh] px-4">
                    {data.map(item => (
                        <FollowUnfollowCard
                            key={item.id}
                            {...item}
                            my_profile={item.id === user.id}
                            handleFollowId={handleFollowId}
                            handleUnfollowId={handleUnfollowId}
                        />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LikesModal
