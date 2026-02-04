import { useEffect, useState } from "react"
import api from "@/api/api"
import StoryCardSkeleton from "@/components/mycomponents/storyCards/StoryCardSkeleton"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import NoItemsPage from "@/components/mycomponents/noItemsPage/NoItemsPage"
import { PencilOff } from "lucide-react"
import StoryCard from "@/components/mycomponents/storyCards/StoryCard"
import { useSearchParams } from "react-router"

const SearchStories = () => {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get("q")
  const [data, setData] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState(false)

  const searchStories = async () => {
    try {
      const response = await api.get(`search_stories?q=${searchTerm.trim()}`)
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
    searchStories()
  }

  useEffect(() => {
    setPageLoading(true)
    setPageError(false)
    setData([])

    searchStories()
  }, [searchTerm])

  if (pageLoading) return (
    <div className="pt-2 md:pt-4 pb-30">
      {Array.from({ length: 4 }, (_, i) => (
        <StoryCardSkeleton key={i} />
      ))}
    </div>
  )
  if (pageError) return <ErrorPage retryFn={handleReloadData} className="h-auto py-20 md:py-28" />
  if (data.length === 0) return <NoItemsPage icon={PencilOff} message="No stories" className="py-24 md:py-32" />
  return (
    <div className="pt-2 md:pt-4 pb-30">
      {data.map(e => <StoryCard
        id={e.id}
        prev_title={e.prev_title}
        prev_subtitle={e.prev_subtitle}
        created_at={e.created_at}
        cover_image={e.cover_image}
        topic={e.topic.name}
        topic_id={e.topic.id}
        profile_id={e.profile.id}
        username={e.profile.username}
        profile_image={e.profile.image}
        likes_count={e.likes_count}
        comments_count={e.comments_count}
        is_saved={e.is_saved}
        key={e.id}
      />)}
    </div>
  )
}

export default SearchStories