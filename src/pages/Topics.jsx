import api from "@/api/api"
import { useState, useEffect } from "react"
import { Link } from "react-router"
import LoadingPage from "@/components/mycomponents/loadingPage/LoadingPage"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"

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

    if (loading) return <LoadingPage className="h-[calc(100dvh-56px)]" />
    if (error) return <ErrorPage className="h-[calc(100dvh-56px)]" retryFn={handleReloadData} />
    return (
        <div className="mx-auto w-17/20 max-w-4xl">
            <div className="pt-6 lg:pt-10">
                <span className="font-semibold text-3xl sm:text-4xl lg:text-5xl">Topics</span>
            </div>
            <div className="pt-6 pb-8 lg:pt-8 lg:pb-12">
                {data.map(e => {
                    return <Link className="inline-block bg-muted mb-2.5 mr-3 px-6 py-2 rounded-full" to={`/topic/${e.id}`} key={e.id}>
                        <span className="text-foreground/90 whitespace-nowrap text-sm">{e.name}</span>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default Topics