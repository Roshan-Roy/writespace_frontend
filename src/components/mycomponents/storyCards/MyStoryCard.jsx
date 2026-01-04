import { FaHeart, FaComment } from "react-icons/fa"
import { Trash2, SquarePen } from "lucide-react"
import { Link } from "react-router"

const MyStoryCard = () => {
  return (
    <div className="relative">

      <Link to="/" className="block border-b py-8 md:py-9">
        <div className="flex gap-5 md:gap-7 mb-6 md:mb-7">
          <div className="flex-1">
            <p className="font-bold text-xl md:text-2xl leading-tight mb-2.5 md:mb-3.5 line-clamp-3 wrap-anywhere">
              Learning daily with focus builds calm confidence and steady growth over time for a better life. Now.
            </p>
            <p className="text-foreground/70 md:text-lg leading-tight line-clamp-4 wrap-anywhere">
              Consistent effort, honest reflection, and patience shape skills, character, and direction, turning small actions into meaningful success. Up
            </p>
          </div>

          <img
            src="/images/default_avatar.jpg"
            alt="cover image"
            className="self-start aspect-video w-20 md:w-40 rounded-sm"
          />
        </div>

        <div className="text-foreground/70 text-sm md:text-base flex items-center gap-4 md:gap-6">
          <span>Dec 26, 2025</span>
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
        <Trash2 className="size-6 text-foreground/80 hover:text-foreground" />
        <SquarePen className="size-6 text-foreground/80 hover:text-foreground" />
      </div>

    </div>
  )
}

export default MyStoryCard
