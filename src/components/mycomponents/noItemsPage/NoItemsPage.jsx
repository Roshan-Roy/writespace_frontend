import { cn } from "@/lib/utils"

const NotItemsPage = ({ className, icon: Icon, message }) => {
    return (
        <div className={cn("w-full flex flex-col justify-center items-center gap-5", className)}>
            <Icon className="self-center w-16 sm:w-18 h-16 sm:h-18" />
            <h1 className="text-lg sm:text-xl font-semibold">{message}</h1>
        </div>
    )
}

export default NotItemsPage