import { Skeleton } from "@/components/ui/skeleton"

const NotificationCardSkeleton = () => {
    return (
        <div className="flex items-center gap-3 lg:gap-4 py-2">
            <Skeleton className="self-start w-10 lg:w-12 h-10 lg:h-12 shrink-0 rounded-full" />
            <div className="flex-1 flex flex-col gap-1.5">
                <Skeleton className="h-4.5 w-full" />
                <Skeleton className="h-3 lg:h-3.5 w-20" />
            </div>
        </div>
    )
}

export default NotificationCardSkeleton