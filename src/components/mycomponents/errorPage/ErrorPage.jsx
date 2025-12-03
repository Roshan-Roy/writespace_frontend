import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CircleAlert } from "lucide-react"

const ErrorPage = ({ retryFn, className }) => {
  return (
    <div className={cn("w-full h-dvh flex flex-col justify-center items-center gap-3", className)}>
      <CircleAlert className="self-center w-16 sm:w-18 h-16 sm:h-18" />
      <h1 className="text-lg sm:text-xl font-semibold">An error occurred</h1>
      <Button className="mt-2 sm:mt-3 px-6" onClick={retryFn}>Try Again</Button>
    </div>
  )
}

export default ErrorPage