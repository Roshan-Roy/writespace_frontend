import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

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
      <div>
        <p>Hello</p >
        <button onClick={handleCloseModal}>Close</button>
      </div >
    )
  }

  return (
    <div className="h-[calc(100dvh-56px)] relative">
      <div className="h-[calc(100dvh-128px)] lg:h-[calc(100dvh-136px)] py-6 md:py-8 lg:py-10 overflow-y-auto">
        <div className="w-17/20 max-w-4xl mx-auto flex flex-col gap-0.5 lg:gap-1.5">
          <Input type="text" placeholder="Title" className="dark:bg-transparent py-2 border-none shadow-none text-3xl md:text-4xl lg:text-5xl h-auto font-heading" />
          <Textarea placeholder="Tell your story..." className="dark:bg-transparent text-lg md:text-xl lg:text-2xl border-none shadow-none resize-none h-auto leading-relaxed" />
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