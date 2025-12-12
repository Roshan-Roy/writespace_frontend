import { Skeleton } from "@/components/ui/skeleton"

const NavProfileDropDownSkeleton = () => {
    return (
        <div className="flex items-center gap-3.5 p-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="h-3 w-26"/>
                <Skeleton className="h-3 w-18"/>
            </div>
        </div>
    )
}

export default NavProfileDropDownSkeleton