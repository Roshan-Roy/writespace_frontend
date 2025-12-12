import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

const NavProfileDropDownSkeleton = () => {
    return (
        <>
            <div className="flex items-center gap-3.5 p-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 flex flex-col gap-2">
                    <Skeleton className="h-3 w-9/10" />
                    <Skeleton className="h-3 w-7/10" />
                </div>
            </div>
            <div className="px-6 py-2">
                <Skeleton className="h-4 w-9/10" />
            </div>
            <div className="px-6 py-2">
                <Skeleton className="h-4 w-7/10" />
            </div>
            <Separator className="mt-4" />
            <div className="px-6 py-4">
                <Skeleton className="h-4 w-9/10" />
            </div>
            <Separator/>
            <div className="flex flex-col gap-1.5 px-6 pt-6 pb-8">
                <Skeleton className="h-3 w-7/10" />
                <Skeleton className="h-3 w-9/10" />
            </div>
        </>
    )
}

export default NavProfileDropDownSkeleton