import { useEffect, useState } from "react"
import api from "@/api/api"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import NoItemsPage from "@/components/mycomponents/noItemsPage/NoItemsPage"
import { Compass } from "lucide-react"
import { useSearchParams } from "react-router"
import TopicCardSkeleton from "@/components/mycomponents/topicCard/TopicCardSkeleton"
import TopicCard from "@/components/mycomponents/topicCard/TopicCard"

const SearchTopics = () => {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get("q")
  const [data, setData] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState(false)

  const searchTopics = async () => {
    try {
      const response = await api.get(`search_topics?q=${searchTerm.trim()}`)
      setData(response.data.data)
    } catch (e) {
      setPageError(true)
    } finally {
      setPageLoading(false)
    }
  }
  const handleReloadData = () => {
    setPageError(false)
    setPageLoading(true)
    searchTopics()
  }

  useEffect(() => {
    setPageLoading(true)
    setPageError(false)
    setData([])

    searchTopics()
  }, [searchTerm])

  if (pageLoading) return (
    <div className="pt-6 pb-8 md:pt-8 md:pb-12">
      {Array.from({ length: 6 }, (_, i) => (
        <TopicCardSkeleton key={i} />
      ))}
    </div>
  )
  if (pageError) return <ErrorPage retryFn={handleReloadData} className="h-auto py-20 md:py-28" />
  if (data.length === 0) return <NoItemsPage icon={Compass} message="No topics" className="py-24 md:py-32" />
  return (
    <div className="pt-6 pb-8 md:pt-8 md:pb-12">
      {data.map(e => <TopicCard {...e} key={e.id} />)}
    </div>
  )
}

export default SearchTopics