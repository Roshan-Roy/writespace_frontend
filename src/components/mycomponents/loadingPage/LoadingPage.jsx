import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

const LoadingPage = ({ className }) => {
  return (
    <div className={cn("w-full h-dvh flex justify-center items-center", className)}>
      <Spinner className="size-10 sm:size-12" />
    </div>
  )
}

export default LoadingPage