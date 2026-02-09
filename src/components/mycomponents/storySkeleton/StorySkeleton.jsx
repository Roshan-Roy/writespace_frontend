import { Skeleton } from "@/components/ui/skeleton"

const StorySkeleton = () => {
    return (
        <div className="mx-auto w-17/20 max-w-4xl">
            <div className="pt-6 lg:pt-10">
                <div className="flex flex-col gap-3 lg:gap-4">
                    <Skeleton className="h-7.5 md:h-9 lg:h-12 w-full" />
                    <Skeleton className="h-7.5 md:h-9 lg:h-12 w-1/2" />
                </div>
                <div className="pt-8 lg:pt-10 pb-30 flex flex-col gap-10 lg:gap-12">
                    {Array.from({ length: 10 }, (_, i) => (
                        <div className="flex flex-col gap-2 lg:gap-3" key={i}>
                            <Skeleton className="h-4.5 md:h-5 lg:h-6 w-full" />
                            <Skeleton className="h-4.5 md:h-5 lg:h-6 w-full" />
                            <Skeleton className="h-4.5 md:h-5 lg:h-6 w-7/8" />
                            <Skeleton className="h-4.5 md:h-5 lg:h-6 w-6/8" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StorySkeleton