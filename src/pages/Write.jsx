import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLayout } from "@/contexts/LayoutContext"
import { SidebarOpen } from "lucide-react"

const Write = () => {
  const { sidebarOpen, setSidebarOpen } = useLayout()

  return (
    <div className="pb-32 pt-6 md:pt-8 lg:pt-10">
      <div className="w-17/20 max-w-4xl mx-auto flex flex-col gap-0.5 lg:gap-1">
        <Input type="text" placeholder="Title" className="dark:bg-transparent py-2 border-none shadow-none text-3xl md:text-4xl lg:text-5xl h-auto font-heading" />
        <Textarea placeholder="Tell your story..." className="dark:bg-transparent text-lg md:text-xl lg:text-2xl border-none shadow-none resize-none h-auto leading-relaxed" />
      </div>
      <div className={`fixed transition-all flex bottom-0 right-0 h-14 lg:h-18 border-t bg-background w-full items-center justify-center ${sidebarOpen ? `lg:w-[calc(100vw-240px)]` : ""}`}>
        <div className="w-17/20 max-w-4xl flex justify-end">
          <Button size="sm" className="px-6 lg:px-8 lg:h-10" onClick={() => alert("published")}>Publish</Button>
        </div>
      </div>
    </div >
  )
}

export default Write