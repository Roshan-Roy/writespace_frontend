import { cn } from "@/lib/utils"
import { CircleAlert } from "lucide-react"

const NotFoundPage = ({ className, message }) => {
    return (
        <div className={cn("w-full h-[calc(100dvh-56px)] flex flex-col justify-center items-center gap-5", className)}>
            <CircleAlert className="self-center w-16 sm:w-18 h-16 sm:h-18" />
            <h1 className="text-lg sm:text-xl font-semibold">{message}</h1>
        </div>
    )
}

export default NotFoundPage