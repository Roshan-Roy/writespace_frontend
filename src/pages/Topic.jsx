import { Link } from "react-router"
import { useEffect, useState } from "react"
import api from "@/api/api"
import LoadingPage from "@/components/mycomponents/loadingPage/LoadingPage"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useParams } from "react-router"
import NotFoundPage from "@/components/mycomponents/notFoundPage/NotFoundPage"
import StoryCard from "@/components/mycomponents/storyCards/StoryCard"

const Topic = () => {
    const { topic_id } = useParams()
    const [data, setData] = useState([])
    const [topicName, setTopicName] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const getTopicAndStories = async () => {
        try {
            const response = await api.get(`stories_topic/${topic_id}/`)
            setData(response.data.data)
            setTopicName(response.data.topic_name)
        } catch (e) {
            const status = e.response?.status
            if (status === 404) {
                setNotFound(true)
            } else {
                setError(true)
            }
        } finally {
            setLoading(false)
        }
    }

    const handleReloadData = () => {
        setError(false)
        setLoading(true)
        getTopicAndStories()
    }

    useEffect(() => {
        getTopicAndStories()
    }, [])

    if (loading) return <LoadingPage className="h-[calc(100dvh-56px)]" />
    if (error) return <ErrorPage className="h-[calc(100dvh-56px)]" retryFn={handleReloadData} />
    if (notFound) return <NotFoundPage message="Topic not found" />
    return (
        <div className="mx-auto w-17/20 max-w-4xl">
            <div className="pt-6 lg:pt-10">
                <Breadcrumb className="mb-4 lg:mb-6">
                    <BreadcrumbList className="lg:text-base">
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/topics">Topics</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{topicName}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex flex-col items-center gap-1.5 sm:gap-3.5 px-4 py-8 sm:py-12 bg-muted rounded-2xl text-center">
                    <span className="font-semibold text-2xl sm:text-3xl">{topicName}</span>
                    <span className="text-muted-foreground text-sm sm:text-base">{data.length} {data.length === 1 ? "story" : "stories"}</span>
                </div>
            </div>
            <div className="pb-30">
                {data.map(e => <StoryCard
                    id={e.id}
                    prev_title={e.prev_title}
                    prev_subtitle={e.prev_subtitle}
                    created_at={e.created_at}
                    cover_image={e.cover_image}
                    profile_id={e.profile.id}
                    username={e.profile.username}
                    profile_image={e.profile.image}
                    key={e.id}
                />)}
            </div>
        </div>

    )
}


export default Topic