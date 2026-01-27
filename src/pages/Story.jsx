import api from "@/api/api"
import { useState, useEffect } from "react"
import { Link } from "react-router"
import LoadingPage from "@/components/mycomponents/loadingPage/LoadingPage"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import NotFoundPage from "@/components/mycomponents/notFoundPage/NotFoundPage"
import { useParams } from "react-router"
import { MEDIA_URL } from "@/lib/urls"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Dot } from "lucide-react"
import { FaRegHeart, FaHeart, FaRegComment, FaRegBookmark, FaBookmark } from "react-icons/fa"
import { useAuth } from "@/contexts/AuthContext"
import LikesModal from "@/components/mycomponents/modals/likesModal/LikesModal"
import sortedProfiles from "@/lib/sortedProfiles"

const Story = () => {
  const { story_id } = useParams()
  const { auth: { user } } = useAuth()
  const [data, setData] = useState(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)

  const handleSaveStory = async () => {
    if (saveLoading) return
    setSaveLoading(true)

    try {
      setData(prev => ({ ...prev, is_saved: true }))
      await api.post(`save/${story_id}/`)
    } catch (e) {
      setData(prev => ({ ...prev, is_saved: false }))
    } finally {
      setSaveLoading(false)
    }
  }

  const handleUnSaveStory = async () => {
    if (saveLoading) return
    setSaveLoading(true)

    try {
      setData(prev => ({ ...prev, is_saved: false }))
      await api.delete(`save/${story_id}/`)
    } catch (e) {
      setData(prev => ({ ...prev, is_saved: true }))
    } finally {
      setSaveLoading(false)
    }
  }

  const addLike = () => {
    setData(prevData => ({
      ...prevData,
      likes: [{ id: user.id, image: user.image, username: user.username, is_following: false }, ...prevData.likes]
    }))
  }

  const removelike = () => {
    setData(prevData => ({
      ...prevData,
      likes: prevData.likes.filter(like => like.id !== user.id)
    }))
  }

  const handleLikeStory = async () => {
    if (likeLoading) return
    setLikeLoading(true)

    try {
      addLike()
      await api.post(`like/${story_id}/`)
    } catch (e) {
      removelike()
    } finally {
      setLikeLoading(false)
    }
  }

  const handleUnLikeStory = async () => {
    if (likeLoading) return
    setLikeLoading(true)

    try {
      removelike()
      await api.delete(`like/${story_id}/`)
    } catch (e) {
      addLike()
    } finally {
      setLikeLoading(false)
    }
  }

  const getStory = async () => {
    try {
      const response = await api.get(`story_details/${story_id}/`)
      const data = response.data.data
      setData({
        topic: data.story.topic_details.name,
        title: data.story.title,
        profile_image: data.story.profile.image,
        username: data.story.profile.username,
        is_following_author: data.is_following_author,
        created_at: data.story.created_at,
        cover_image: data.story.cover_image,
        content: data.story.content,
        likes: sortedProfiles(data.likes, user.id),
        comments: data.comments,
        is_saved: data.is_saved
      })
    } catch (e) {
      const status = e.response?.status
      if (status === 404) {
        setNotFound(true)
      } else {
        setPageError(true)
      }
    } finally {
      setPageLoading(false)
    }
  }
  const handleReloadData = () => {
    setPageError(false)
    setPageLoading(true)
    getStory()
  }

  useEffect(() => {
    getStory()
  }, [])

  if (pageLoading) return <LoadingPage className="h-[calc(100dvh-56px)]" />
  if (pageError) return <ErrorPage className="h-[calc(100dvh-56px)]" retryFn={handleReloadData} />
  if (notFound) return <NotFoundPage message="Story not found" />
  return (
    <div className="mx-auto w-17/20 max-w-4xl">
      <div className="flex flex-col gap-3 lg:gap-4 pt-6 lg:pt-10">
        <span className="text-foreground/70 lg:text-lg">In {data.topic}</span>
        <p className="text-3xl md:text-4xl lg:text-5xl leading-relaxed font-heading wrap-anywhere">{data.title}</p>
      </div>
      <p className="text-foreground/70 my-2 md:hidden">{formatDate(data.created_at)}</p>
      <div className="flex items-center justify-between gap-4 md:gap-8 py-2 md:mt-2 md:justify-start">
        <div className="flex items-center gap-4 lg:gap-5 min-w-0">
          <img src={data.profile_image ? `${MEDIA_URL}${data.profile_image}` : "/images/default_avatar.jpg"} alt="profile picture" className="w-12 lg:w-14 h-12 lg:h-14 rounded-full" />
          <span className="truncate lg:text-lg">{data.username}</span>
        </div>
        <Button variant="outline" className="w-28 md:w-32 rounded-full" disabled={followLoading}>{followLoading ? <Spinner /> : data.is_following_author ? "Unfollow" : "Follow"}</Button>
        <div className="hidden md:flex items-center gap-1">
          <Dot />
          <p className="text-foreground/70 lg:text-lg">{formatDate(data.created_at)}</p>
        </div>
      </div>
      <div className="flex justify-between items-center text-foreground/80 py-4.5 px-2 mt-4 lg:mt-6 border-y">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2.5">
            {data.likes.some(like => like.id === user.id) ? <FaHeart className="text-2xl" onClick={handleUnLikeStory} /> : <FaRegHeart className="text-2xl" onClick={handleLikeStory} />}
            <LikesModal data={data.likes} setData={setData}>{data.likes.length}</LikesModal>
          </div>
          <div className="flex items-center gap-2.5">
            <FaRegComment className="text-2xl" />
            <span>{data.comments.length}</span>
          </div>
        </div>
        {data.is_saved ? <FaBookmark className="text-2xl" onClick={handleUnSaveStory} /> : <FaRegBookmark className="text-2xl" onClick={handleSaveStory} />}
      </div>
      {data.cover_image && (
        <div className="w-full aspect-video mt-8 lg:mt-10">
          <img
            src={`${MEDIA_URL}${data.cover_image}`}
            alt="cover image"
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      )}
      <p className="text-lg md:text-xl lg:text-2xl leading-loose pt-4 lg:pt-6 pb-20 lg:pb-24">{data.content}</p>
    </div>
  )
}

export default Story