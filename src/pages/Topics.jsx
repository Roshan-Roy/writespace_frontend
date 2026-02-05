import api from "@/api/api"
import { useState, useEffect } from "react"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import { Skeleton } from "@/components/ui/skeleton"
import TopicCard from "@/components/mycomponents/topicCard/TopicCard"
import TopicCardSkeleton from "@/components/mycomponents/topicCard/TopicCardSkeleton"

const Topics = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getTopics = async () => {
        try {
            const response = await api.get("all_topics/")
            setData(response.data.data)
        } catch (e) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }
    const handleReloadData = () => {
        setError(false)
        setLoading(true)
        getTopics()
    }

    useEffect(() => {
        getTopics()
    }, [])

    if (loading) return (
        <div className="mx-auto w-17/20 max-w-4xl">
            <div className="pt-6 lg:pt-10">
                <Skeleton className="h-7.5 sm:h-9 lg:h-12 w-46" />
            </div>
            <div className="pt-6 pb-8 lg:pt-8 lg:pb-12">
                {Array.from({ length: 6 }, (_, i) => (
                    <TopicCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
    if (error) return <ErrorPage className="h-[calc(100dvh-56px)]" retryFn={handleReloadData} />
    return (
        <div className="mx-auto w-17/20 max-w-4xl">
            <div className="pt-6 lg:pt-10">
                <span className="font-semibold text-3xl sm:text-4xl lg:text-5xl">Topics</span>
            </div>
            <div className="pt-6 pb-8 lg:pt-8 lg:pb-12">
                {data.map(e => <TopicCard {...e} key={e.id} />)}
            </div>
        </div>
    )
}

export default Topics