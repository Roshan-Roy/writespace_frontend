import { Skeleton } from "@/components/ui/skeleton"

const TopicCardSkeleton = () => {
    return (
        <>
            <Skeleton className="inline-block bg-muted mb-2.5 mr-3 h-10 w-30 rounded-full" />
            <Skeleton className="inline-block bg-muted mb-2.5 mr-3 h-10 w-20 rounded-full" />
            <Skeleton className="inline-block bg-muted mb-2.5 mr-3 h-10 w-40 rounded-full" />
            <Skeleton className="inline-block bg-muted mb-2.5 mr-3 h-10 w-50 rounded-full" />
            <Skeleton className="inline-block bg-muted mb-2.5 mr-3 h-10 w-20 rounded-full" />
            <Skeleton className="inline-block bg-muted mb-2.5 mr-3 h-10 w-40 rounded-full" />
            <Skeleton className="inline-block bg-muted mb-2.5 mr-3 h-10 w-30 rounded-full" />
            <Skeleton className="inline-block bg-muted mb-2.5 mr-3 h-10 w-40 rounded-full" />
            <Skeleton className="inline-block bg-muted mb-2.5 mr-3 h-10 w-50 rounded-full" />
        </>
    )
}

export default TopicCardSkeleton