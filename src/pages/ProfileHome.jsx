import StoryCard from "@/components/mycomponents/storyCards/StoryCard"
import { useEffect, useState } from "react"
import api from "@/api/api"
import StoryCardSkeleton from "@/components/mycomponents/storyCards/StoryCardSkeleton"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import NoItemsPage from "@/components/mycomponents/noItemsPage/NoItemsPage"
import { PencilOff } from "lucide-react"
import { useParams } from "react-router"

const ProfileHome = () => {
  const { profile_id } = useParams()
  const [data, setData] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState(false)

  const getStories = async () => {
    try {
      const response = await api.get(`stories_profile/${profile_id}/`)
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
    getStories()
  }

  useEffect(() => {
    getStories()
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
  if (data.length === 0) return <NoItemsPage icon={PencilOff} message="No stories yet" className="py-22 md:py-24" />
  return (
    <>
      <div className="pb-30">
        {data.map(e => <StoryCard
          id={e.id}
          prev_title={e.prev_title}
          prev_subtitle={e.prev_subtitle}
          created_at={e.created_at}
          cover_image={e.cover_image}
          topic={e.topic.name}
          topic_id={e.topic.id}
          key={e.id}
        />)}
      </div>
    </>
  )
}

export default ProfileHome