import { Skeleton } from "@/components/ui/skeleton"

const StoryCardSkeleton = () => {
    return (
        <div className="relative">
            <Skeleton className="absolute left-0 top-8 md:top-9 h-4 w-40" />
            <div to="/" className="block border-b pb-8 md:pb-9 pt-19 md:pt-20">
                <div className="flex gap-5 md:gap-7 mb-6 md:mb-7">
                    <div className="flex-1">
                        <Skeleton className="mb-2.5 md:mb-3.5 h-6 max-w-xl" />
                        <Skeleton className="w-3/4 h-4 max-w-sm"/>
                    </div>

                    <Skeleton className="self-start aspect-video w-20 md:w-40 rounded-sm" />
                </div>

                <Skeleton className="h-4 w-30"/>
            </div>

            <Skeleton className="absolute bottom-8 md:bottom-9 right-0 h-4 w-12" />

        </div>
    )
}

export default StoryCardSkeleton