import { useParams } from "react-router"
import { useState, useEffect, useRef } from "react"
import api from "@/api/api"
import LoadingPage from "@/components/mycomponents/loadingPage/LoadingPage"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import { useNavigate } from "react-router"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CircleCheck, CircleX, LoaderIcon, XIcon } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { MEDIA_URL } from "@/lib/urls"
import toast from "react-hot-toast"
import CustomToast from "@/components/mycomponents/toast/CustomToast"
import NotFoundPage from "@/components/mycomponents/notFoundPage/NotFoundPage"
import trim from "@/lib/trim"

const EditStory = () => {
    const { story_id } = useParams()
    const navigate = useNavigate()
    const [pageLoading, setPageLoading] = useState(true)
    const [loadingUpdateStory, setLoadingUpdateStory] = useState(false)
    const [pageError, setPageError] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [data, setData] = useState({
        title: "",
        content: "",
        prev_title: "",
        prev_subtitle: "",
        cover_image: null,
        topic: ""
    })
    const [defaultCoverImage, setDefaultCoverImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [allTopics, setAllTopics] = useState([])
    const isActiveRef = useRef(true)

    const publishBtnDisabled = !(trim(data.title) && trim(data.content))
    const confirmBtnDisabled = !(trim(data.prev_title) && trim(data.prev_subtitle) && data.topic)
    const limits = { prev_title: 100, prev_subtitle: 140 }

    const handleInputChange = (value, fieldName) => {
        const max = limits[fieldName]
        setData(prevData => ({
            ...prevData,
            [fieldName]: max ? value.slice(0, max) : value,
        }))
    }
    const handleClearCoverImageSelection = () => {
        setData(prevData => ({ ...prevData, cover_image: null }))
        setDefaultCoverImage(null)
    }
    const handleOpenModal = () => {
        setModalOpen(true)
    }
    const handleCloseModal = () => {
        setModalOpen(false)
    }
    const updateStory = async () => {
        const toastId = toast.custom(
            t => (
                <CustomToast
                    t={t}
                    icon={LoaderIcon}
                    iconStyles="animate-spin"
                    message="Updating story..."
                />
            ),
            { duration: Infinity }
        )
        setModalOpen(false)
        setLoadingUpdateStory(true)
        try {
            const formData = new FormData()

            formData.append("title", data.title)
            formData.append("content", data.content)
            formData.append("prev_title", data.prev_title)
            formData.append("prev_subtitle", data.prev_subtitle)
            formData.append("topic", data.topic)

            if (data.cover_image || !defaultCoverImage) {
                if (data.cover_image) {
                    formData.append("cover_image", data.cover_image)
                }
                formData.append("remove_image", "true")
            }

            await api.patch(`story/${story_id}/`, formData)

            toast.custom(
                t => (
                    <CustomToast
                        t={t}
                        icon={CircleCheck}
                        iconStyles="text-green-500"
                        message="Story updated successfully!"
                    />
                ),
                { id: toastId, duration: 4000 }
            )
            if (isActiveRef.current) {
                navigate("/my_profile")
            }

        } catch (e) {
            toast.custom(
                t => (
                    <CustomToast
                        t={t}
                        icon={CircleX}
                        iconStyles="text-red-500"
                        message="An error occurred"
                    />
                ),
                { id: toastId, duration: 4000 }
            )
            setLoadingUpdateStory(false)
        }
    }
    const getStoryAndTopics = async () => {
        try {
            const [responseOne, responseTwo] = await Promise.all([
                api.get(`story/${story_id}/`),
                api.get("all_topics/")
            ])
            setAllTopics(responseTwo.data.data)
            const storyData = responseOne.data.data
            setData(prevData => ({
                ...prevData,
                title: storyData.title,
                content: storyData.content,
                topic: storyData.topic_details.id,
                prev_title: storyData.prev_title,
                prev_subtitle: storyData.prev_subtitle
            }))
            setDefaultCoverImage(storyData.cover_image)
        } catch (e) {
            const status = e.response?.status
            if (status === 404) {
                setNotFound(true)
            } else {
                setPageError(true)
            }
        } finally {
            setPageLoading(false)
        }
    }
    const handleReloadData = () => {
        setPageError(false)
        setPageLoading(true)
        getStoryAndTopics()
    }

    useEffect(() => {
        if (!data.cover_image) {
            setPreviewUrl(null)
            return
        }

        const url = URL.createObjectURL(data.cover_image)
        setPreviewUrl(url)

        return () => {
            URL.revokeObjectURL(url)
        }
    }, [data.cover_image])

    useEffect(() => {
        isActiveRef.current = true
        getStoryAndTopics()
        return () => {
            isActiveRef.current = false
        }
    }, [])

    if (pageLoading) return <LoadingPage className="h-[calc(100dvh-56px)]" />
    if (pageError) return <ErrorPage className="h-[calc(100dvh-56px)]" retryFn={handleReloadData} />
    if (notFound) return <NotFoundPage message="Story not found" />
    if (modalOpen) {
        return (
            <div className="pt-4 pb-10 sm:pt-6 sm:pb-14">
                <div className="w-17/20 max-w-4xl mx-auto pt-6 sm:pt-12 relative flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <XIcon onClick={handleCloseModal} className="absolute top-0 right-0 opacity-70 transition-opacity hover:opacity-100 text-muted-foreground cursor-pointer" />
                    <div className="sm:flex-1">
                        <span className="font-semibold mb-2.5 inline-block">Cover Image</span>
                        <div className="aspect-video mb-3 relative">
                            {(previewUrl || defaultCoverImage) ? (
                                <>
                                    <div className="absolute top-0 right-0 h-6 w-6 rounded-full flex justify-center items-center translate-x-1/4 -translate-y-1/4 border border-input bg-background" onClick={handleClearCoverImageSelection}>
                                        <XIcon className="size-4" />
                                    </div>
                                    <img
                                        src={previewUrl || `${MEDIA_URL}${defaultCoverImage}`}
                                        alt="cover image"
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                </>
                            ) : (
                                <label
                                    htmlFor="cover_image"
                                    className="flex flex-col gap-2 justify-center items-center w-full h-full px-10 sm:px-16 bg-muted text-bg-muted-foreground rounded-sm leading-relaxed text-xs lg:text-sm text-center"
                                >
                                    <span>Choose a high-quality image that captures the essence of your story (optional).</span>
                                    <span className="opacity-70">16:9 recommended</span>
                                </label>
                            )}
                        </div>
                        <input type="file" id="cover_image" className="hidden" onChange={e => handleInputChange(e.target.files[0], "cover_image")} />
                        <Textarea placeholder="Write a preview title" className="shadow-none h-auto border-0 border-b-2 rounded-none dark:bg-transparent mb-1 text-lg font-bold min-h-0 px-0 break-all" value={data.prev_title} onChange={e => handleInputChange(e.target.value, "prev_title")} />
                        <Textarea placeholder="Write a preview subtitle..." className="shadow-none h-auto border-0 border-b-2 rounded-none dark:bg-transparent min-h-0 text-sm mb-2 lg:mb-3 px-0 break-all" value={data.prev_subtitle} onChange={e => handleInputChange(e.target.value, "prev_subtitle")} />
                        <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed"><span className="font-semibold">Note :</span> Changes here only affect how your story appears in previews, not the actual content.</p>
                    </div>
                    <div className="sm:flex-1">
                        <span className="font-semibold mb-2.5 inline-block">Topic</span>
                        <Select value={data.topic} onValueChange={(value) => handleInputChange(value, "topic")}>
                            <SelectTrigger className="data-[size=default]:h-auto w-full py-2.5 px-4">
                                <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Topics</SelectLabel>
                                    {allTopics.map(e => <SelectItem value={e.id} key={e.id}>{e.name}</SelectItem>)}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button variant="success" size="lg" className="w-full mt-6 mb-4" disabled={confirmBtnDisabled} onClick={updateStory}>Confirm</Button>
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
                    <Button variant="success" size="sm" className="px-8 lg:px-10 lg:h-9 rounded-full" onClick={handleOpenModal} disabled={publishBtnDisabled || loadingUpdateStory}>Save</Button>
                </div>
            </div>
        </div>
    )
}

export default EditStory