import { useEffect, useState } from "react"
import api from "@/api/api"
import StoryCardSkeleton from "@/components/mycomponents/storyCards/StoryCardSkeleton"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import NoItemsPage from "@/components/mycomponents/noItemsPage/NoItemsPage"
import { BookmarkX } from "lucide-react"
import StoryCard from "@/components/mycomponents/storyCards/StoryCard"
import { Skeleton } from "@/components/ui/skeleton"

const Saved = () => {
  const [data, setData] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState(false)

  const getSavedStories = async () => {
    try {
      const response = await api.get("stories_saved/")
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
    getSavedStories()
  }

  useEffect(() => {
    getSavedStories()
  }, [])

  if (pageLoading) return (
    <div className="mx-auto w-17/20 max-w-4xl">
      <div className="pt-6 lg:pt-10">
        <Skeleton className="h-7.5 sm:h-9 lg:h-12 w-42" />
      </div>
      <div className="sm:pt-1 lg:pt-2.5 pb-30">
        <StoryCardSkeleton />
        <StoryCardSkeleton />
        <StoryCardSkeleton />
        <StoryCardSkeleton />
      </div>
    </div>
  )
  if (pageError) return <ErrorPage retryFn={handleReloadData} className="h-[calc(100dvh-56px)]" />
  if (data.length === 0) return <NoItemsPage icon={BookmarkX} message="No saved stories" className="h-[calc(100dvh-56px)]" />
  return (
    <div className="mx-auto w-17/20 max-w-4xl">
      <div className="pt-6 lg:pt-10">
        <span className="font-semibold text-3xl sm:text-4xl lg:text-5xl">Saved</span>
      </div>
      <div className="sm:pt-1 lg:pt-2.5 pb-30">
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
    </div>
  )
}

export default Saved