import { FaHeart, FaComment, FaRegBookmark, FaBookmark } from "react-icons/fa"
import { MdOutlineBookmarkBorder } from "react-icons/md";

const StoryCard = () => {
    return (
        <div className="border-b py-8">
            <div className="flex items-center gap-2.5">
                <img src="/images/default_avatar.jpg" className="w-6 h-6 rounded-full" alt="profile picture" />
                <span><span className="text-foreground/70">By</span> roshan</span>
            </div>
            <div className="flex gap-5 mt-4 mb-6">
                <div className="flex-1">
                    <p className="font-bold text-xl leading-tight mb-2.5 line-clamp-3 wrap-anywhere">Learning daily with focus builds calm confidence and steady growth over time for a better life. Now.</p>
                    <p className="text-foreground/70 leading-tight line-clamp-4 wrap-anywhere">Consistent effort, honest reflection, and patience shape skills, character, and direction, turning small actions into meaningful success. Up</p>
                </div>
                <img src="/images/default_avatar.jpg" alt="cover image" className="self-start aspect-video w-20 md:w-40 rounded-sm" />
            </div>
            <div className="flex items-center justify-between">
                <div className="text-foreground/70 text-sm flex items-center gap-6">
                    <span className="">Dec 26,2025</span>
                    <div className="flex items-center gap-1.5">
                        <FaHeart />
                        <span>423</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FaComment />
                        <span>150</span>
                    </div>
                </div>
                <FaRegBookmark className="text-xl" />
            </div>
        </div>
    )
}

export default StoryCard