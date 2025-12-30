import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { XIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Write = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [data, setData] = useState({
    title: "",
    content: "",
    prev_title: "",
    prev_subtitle: "",
    cover_image: null,
    topic: ""
  })

  const handleInputChange = (value, fieldName) => {
    setData(prevData => ({ ...prevData, [fieldName]: value }))
  }
  const handleClearCoverImageSelection = () => {
    setData(prevData => ({ ...prevData, cover_image: null }))
  }
  const handleOpenModal = () => {
    setModalOpen(true)
  }
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  console.log(data)

  if (modalOpen) {
    return (
      <div className="pt-4 pb-10 sm:pt-6 sm:pb-14">
        <div className="w-17/20 max-w-4xl mx-auto pt-6 sm:pt-12 relative flex flex-col sm:flex-row gap-4 sm:gap-8">
          <XIcon onClick={handleCloseModal} className="absolute top-0 right-0 opacity-70 transition-opacity hover:opacity-100 text-muted-foreground cursor-pointer" />
          <div className="sm:flex-1">
            <span className="font-semibold mb-2.5 inline-block">Cover Image</span>
            <div className="aspect-video mb-3 relative">
              {data.cover_image ? (
                <>
                  <div className="absolute top-0 right-0 h-6 w-6 rounded-full flex justify-center items-center translate-x-1/4 -translate-y-1/4 border border-input bg-background" onClick={handleClearCoverImageSelection}>
                    <XIcon className="size-4" />
                  </div>
                  <img
                    src={URL.createObjectURL(data.cover_image)}
                    alt="cover image"
                    className="w-full h-full object-cover rounded-sm"
                  />
                </>
              ) : (
                <label
                  htmlFor="preview_image"
                  className="flex flex-col gap-2 justify-center items-center w-full h-full px-10 sm:px-16 bg-muted text-bg-muted-foreground rounded-sm leading-relaxed text-xs lg:text-sm text-center"
                >
                  <span>Choose a high-quality image that captures the essence of your story (optional).</span>
                  <span className="opacity-70">16:9 recommended</span>
                </label>
              )}
            </div>
            <input type="file" id="preview_image" className="hidden" onChange={e => handleInputChange(e.target.files[0], "cover_image")} />
            <Textarea placeholder="Write a preview title" className="shadow-none h-auto border-0 border-b-2 rounded-none dark:bg-transparent mb-1 text-lg font-bold min-h-0 px-0" value={data.prev_title} onChange={e => handleInputChange(e.target.value, "prev_title")} />
            <Textarea placeholder="Write a preview subtitle..." className="shadow-none h-auto border-0 border-b-2 rounded-none dark:bg-transparent min-h-0 text-sm mb-2 lg:mb-3 px-0" value={data.prev_subtitle} onChange={e => handleInputChange(e.target.value, "prev_subtitle")} />
            <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed"><span className="font-semibold">Note :</span> Changes here only affect how your story appears in previews, not the actual content.</p>
          </div>
          <div className="sm:flex-1">
            <span className="font-semibold mb-2.5 inline-block">Topic</span>
            <Select>
              <SelectTrigger className="data-[size=default]:h-auto w-full py-2.5 px-4">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="success" size="lg" className="w-full mt-6 mb-4">Confirm</Button>
          </div>
        </div>
      </div >
    )
  }

  return (
    <div className="h-[calc(100dvh-56px)] relative">
      <div className="h-[calc(100dvh-128px)] lg:h-[calc(100dvh-136px)] py-6 md:py-8 lg:py-10 overflow-y-auto">
        <div className="w-17/20 max-w-4xl mx-auto flex flex-col gap-0.5 lg:gap-1.5">
          <Textarea type="text" placeholder="Title" className="dark:bg-transparent border-none shadow-none text-3xl md:text-4xl lg:text-5xl min-h-0 font-heading leading-relaxed" value={data.title} onChange={e => handleInputChange(e.target.value, "title")} />
          <Textarea placeholder="Tell your story..." className="dark:bg-transparent text-lg md:text-xl lg:text-2xl border-none shadow-none min-h-0 leading-relaxed" value={data.content} onChange={e => handleInputChange(e.target.value, "content")} />
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