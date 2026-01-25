import { useEffect, useState } from "react"
import api from "@/api/api"
import StoryCardSkeleton from "@/components/mycomponents/storyCards/StoryCardSkeleton"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import NoItemsPage from "@/components/mycomponents/noItemsPage/NoItemsPage"
import { BookmarkX } from "lucide-react"
import StoryCard from "@/components/mycomponents/storyCards/StoryCard"

const MyProfileSaved = () => {
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
    <div className="pb-15">
      <StoryCardSkeleton />
      <StoryCardSkeleton />
      <StoryCardSkeleton />
      <StoryCardSkeleton />
    </div>
  )
  if (pageError) return <ErrorPage retryFn={handleReloadData} className="h-auto py-18 md:py-20" />
  if (data.length === 0) return <NoItemsPage icon={BookmarkX} message="No saved stories" className="py-22 md:py-24" />
  return (
    <div className="pb-30">
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

export default MyProfileSaved