import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { XIcon } from "lucide-react"

const Write = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  if (modalOpen) {
    return (
      <div className="py-4">
        <div className="w-17/20 max-w-4xl mx-auto py-6 relative">
          <XIcon onClick={handleCloseModal} className="absolute top-0 right-0 opacity-70 transition-opacity hover:opacity-100 text-muted-foreground" />
          <div>
            <span className="font-semibold mb-3 inline-block">Cover Image</span>
            <label htmlFor="preview_image" className="flex justify-center items-center h-44 p-10 bg-muted text-bg-muted-foreground rounded-sm mb-3">
              <span className="leading-relaxed text-xs text-center">Choose a high-quality image that captures the essence of your story (optional).</span>
            </label>
            <input type="file" id="preview_image" className="hidden" />
            <Textarea placeholder="Write a preview title" className="shadow-none h-auto border-0 border-b-2 rounded-none dark:bg-transparent mb-1 text-lg font-bold min-h-0 px-0" />
            <Textarea placeholder="Write a preview subtitle..." className="shadow-none h-auto border-0 border-b-2 rounded-none dark:bg-transparent min-h-0 text-sm mb-2 px-0" />
            <p className="text-xs text-muted-foreground leading-relaxed"><span className="font-semibold">Note :</span> Changes here only affect how your story appears in previews, not the actual content.</p>
          </div>
          <div>

          </div>
        </div>
      </div >
    )
  }

  return (
    <div className="h-[calc(100dvh-56px)] relative">
      <div className="h-[calc(100dvh-128px)] lg:h-[calc(100dvh-136px)] py-6 md:py-8 lg:py-10 overflow-y-auto">
        <div className="w-17/20 max-w-4xl mx-auto flex flex-col gap-0.5 lg:gap-1.5">
          <Textarea type="text" placeholder="Title" className="dark:bg-transparent border-none shadow-none text-3xl md:text-4xl lg:text-5xl min-h-0 font-heading leading-relaxed" />
          <Textarea placeholder="Tell your story..." className="dark:bg-transparent text-lg md:text-xl lg:text-2xl border-none shadow-none min-h-0 leading-relaxed" />
        </div>
      </div>
      <div className="absolute flex bottom-0 right-0 h-14 lg:h-16 border-t bg-background w-full items-center justify-center">
        <div className="w-17/20 max-w-4xl flex justify-end">
          <Button variant="success" size="sm" className="px-8 lg:px-10 lg:h-9 rounded-full" onClick={handleOpenModal}>Publish</Button>
        </div>
      </div>
    </div>
  )

}

export default Write