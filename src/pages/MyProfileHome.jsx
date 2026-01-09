import MyStoryCard from "@/components/mycomponents/storyCards/MyStoryCard"
import { useEffect, useState } from "react"
import api from "@/api/api"
import StoryCardSkeleton from "@/components/mycomponents/storyCards/StoryCardSkeleton"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"

const MyProfileHome = () => {
  const [data, setData] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState(false)

  const getMyStories = async () => {
    try {
      const response = await api.get("my_stories/")
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
    getMyStories()
  }

  useEffect(() => {
    getMyStories()
  }, [])

  if (pageLoading) return (
    <div className="pb-15">
      <StoryCardSkeleton />
      <StoryCardSkeleton />
      <StoryCardSkeleton />
      <StoryCardSkeleton />
    </div>
  )
  if (pageError) return <ErrorPage retryFn={handleReloadData} className="h-auto py-16 md:py-20" />
  return (
    <div className="pb-30">
      {data.map(e => <MyStoryCard
        id={e.id}
        prev_title={e.prev_title}
        prev_subtitle={e.prev_subtitle}
        created_at={e.created_at}
        cover_image={e.cover_image}
        topic={e.topic.name}
        key={e.id}
      />)}
    </div>
  )
}

export default MyProfileHome