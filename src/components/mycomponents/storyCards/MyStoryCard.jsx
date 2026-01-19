import { FaHeart, FaComment } from "react-icons/fa"
import { Trash2, SquarePen } from "lucide-react"
import { Link } from "react-router"
import { formatDate } from "@/lib/utils"
import { MEDIA_URL } from "@/lib/urls"

const MyStoryCard = ({
  id,
  prev_title,
  prev_subtitle,
  created_at,
  cover_image,
  topic,
  topic_id,
  handleSetDeleteId
}) => {
  const handleDeleteBtnClick = () => {
    handleSetDeleteId(id)
  }
  return (
    <div className="relative">
      <p className="absolute left-0 top-8 md:top-9 text-sm md:text-base text-foreground/70 cursor-pointer">In <Link to={`/topic/${topic_id}`} className="hover:underline text-foreground/80">{topic}</Link></p>
      <Link to="/" className="block border-b pb-8 md:pb-9 pt-19 md:pt-20">
        <div className="flex gap-5 md:gap-7 mb-6 md:mb-7">
          <div className="flex-1">
            <p className="font-bold text-xl md:text-2xl leading-tight mb-2.5 md:mb-3.5 line-clamp-3 wrap-anywhere">{prev_title}</p>
            <p className="text-foreground/70 md:text-lg leading-tight line-clamp-4 wrap-anywhere">{prev_subtitle}</p>
          </div>
          {cover_image && <img
            src={`${MEDIA_URL}${cover_image}`}
            alt="cover image"
            className="self-start aspect-video w-20 md:w-40 rounded-sm"
          />}
        </div>
        <div className="text-foreground/70 text-sm md:text-base flex items-center gap-4 md:gap-6">
          <span>{formatDate(created_at)}</span>
          <div className="flex items-center gap-1.5">
            <FaHeart />
            <span>423</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaComment />
            <span>150</span>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-8 md:bottom-9 right-0 flex items-center gap-2.5 md:gap-3.5 cursor-pointer">
        <Trash2 className="size-6 text-foreground/80 hover:text-foreground" onClick={handleDeleteBtnClick} />
        <Link to={`/edit/${id}`}><SquarePen className="size-6 text-foreground/80 hover:text-foreground" /></Link>
      </div>
    </div>
  )
}

export default MyStoryCard
