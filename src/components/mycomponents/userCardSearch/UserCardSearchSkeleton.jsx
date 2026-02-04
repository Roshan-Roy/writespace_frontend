import { Skeleton } from "@/components/ui/skeleton"

const UserCardSearchSkeleton = () => {
    return (
        <div className="flex items-center py-2 md:py-3 gap-4 md:gap-6">
            <Skeleton className="w-12 md:w-14 h-12 md:h-14 rounded-full" />
            <Skeleton className="flex-1 h-4 md:h-4.5" />
        </div>
    )
}

export default UserCardSearchSkeleton