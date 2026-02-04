import { useEffect, useState } from "react"
import api from "@/api/api"
import UserCardSearchSkeleton from "@/components/mycomponents/userCardSearch/UserCardSearchSkeleton"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import NoItemsPage from "@/components/mycomponents/noItemsPage/NoItemsPage"
import { UserX } from "lucide-react"
import { useSearchParams, Link } from "react-router"

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
      {Array.from({ length: 10 }, (_, i) => (
        <UserCardSearchSkeleton key={i} />
      ))}
    </div>
  )
  if (pageError) return <ErrorPage retryFn={handleReloadData} className="h-auto py-20 md:py-28" />
  if (data.length === 0) return <NoItemsPage icon={UserX} message="No topics" className="py-24 md:py-32" />
  return (
    <div className="pt-6 pb-8 md:pt-8 md:pb-12">
      {data.map(e => {
        return <Link className="inline-block bg-muted mb-2.5 mr-3 px-6 py-2 rounded-full" to={`/topic/${e.id}`} key={e.id}>
          <span className="text-foreground/90 whitespace-nowrap text-sm">{e.name}</span>
        </Link>
      })}
    </div>
  )
}

export default SearchTopics