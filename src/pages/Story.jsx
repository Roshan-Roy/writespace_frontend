import api from "@/api/api"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import NotFoundPage from "@/components/mycomponents/notFoundPage/NotFoundPage"
import { useParams } from "react-router"
import { MEDIA_URL } from "@/lib/urls"
import { formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Dot, CircleX } from "lucide-react"
import { FaRegHeart, FaHeart, FaRegComment, FaRegBookmark, FaBookmark } from "react-icons/fa"
import { useAuth } from "@/contexts/AuthContext"
import LikesModal from "@/components/mycomponents/modals/likesModal/LikesModal"
import sortedProfiles from "@/lib/sortedProfiles"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import CustomToast from "@/components/mycomponents/toast/CustomToast"
import Comment from "@/components/mycomponents/comment/Comment"
import StorySkeleton from "@/components/mycomponents/storySkeleton/StorySkeleton"

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
  const [responseLoading, setResponseLoading] = useState(false)
  const [responseData, setResponseData] = useState("")
  const sectionRef = useRef(null)

  const respondBtnDisabled = !responseData.trim()

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const handleResponseDataChange = (value) => {
    setResponseData(value)
  }

  const addResponse = (data) => {
    setData(prevData => ({
      ...prevData,
      comments: [data, ...prevData.comments]
    }))
  }

  const removeResponse = (id) => {
    setData(prevData => ({
      ...prevData,
      comments: prevData.comments.filter(
        comment => comment.id !== id
      )
    }))
  }

  const sortedComments = (data) => {
    const myComments = []
    const followingComments = []
    const notFollowingComments = []
    data.forEach(e => {
      if (e.profile.id === user.id) {
        myComments.push(e)
      } else if (e.profile.is_following) {
        followingComments.push(e)
      } else {
        notFollowingComments.push(e)
      }
    })
    return [...myComments, ...followingComments, ...notFollowingComments]
  }


  const handleAddResponse = async () => {
    try {
      setResponseLoading(true)
      const response = await api.post(`comment/${story_id}/`, {
        content: responseData
      })
      setResponseData("")
      addResponse(response.data.data)
    } catch (e) {
      toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
    } finally {
      setResponseLoading(false)
    }
  }

  const handleSaveStory = async () => {
    if (saveLoading) return
    setSaveLoading(true)

    try {
      setData(prevData => ({ ...prevData, is_saved: true }))
      await api.post(`save/${story_id}/`)
    } catch (e) {
      setData(prevData => ({ ...prevData, is_saved: false }))
    } finally {
      setSaveLoading(false)
    }
  }

  const handleUnSaveStory = async () => {
    if (saveLoading) return
    setSaveLoading(true)

    try {
      setData(prevData => ({ ...prevData, is_saved: false }))
      await api.delete(`save/${story_id}/`)
    } catch (e) {
      setData(prevData => ({ ...prevData, is_saved: true }))
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

  const handleFollowBtnClick = async () => {
    try {
      setFollowLoading(true)
      await api.post(`follow/${data.profile_id}/`)
      setData(prevData => ({ ...prevData, is_following_author: true }))
    } catch (e) {
      toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
    } finally {
      setFollowLoading(false)
    }
  }

  const handleUnFollowBtnClick = async () => {
    try {
      setFollowLoading(true)
      await api.delete(`follow/${data.profile_id}/`)
      setData(prevData => ({ ...prevData, is_following_author: false }))
    } catch (e) {
      toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
    } finally {
      setFollowLoading(false)
    }
  }

  const getStory = async () => {
    try {
      const response = await api.get(`story_details/${story_id}/`)
      const data = response.data.data
      setData({
        topic: data.story.topic_details.name,
        topic_id: data.story.topic_details.id,
        title: data.story.title,
        profile_id: data.story.profile.id,
        profile_image: data.story.profile.image,
        username: data.story.profile.username,
        is_following_author: data.is_following_author,
        created_at: data.story.created_at,
        cover_image: data.story.cover_image,
        content: data.story.content,
        likes: sortedProfiles(data.likes, user.id),
        comments: sortedComments(data.comments),
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

  if (pageLoading) return <StorySkeleton />
  if (pageError) return <ErrorPage className="h-[calc(100dvh-56px)]" retryFn={handleReloadData} />
  if (notFound) return <NotFoundPage message="Story not found" />
  return (
    <>
      <div className="mx-auto w-17/20 max-w-4xl">
        <div className="flex flex-col gap-3 lg:gap-4 pt-6 lg:pt-10">
          <span className="text-foreground/70 lg:text-lg">In <Link to={`/topic/${data.topic_id}`}>{data.topic}</Link></span>
          <p className="text-3xl md:text-4xl lg:text-5xl leading-relaxed font-heading wrap-anywhere">{data.title}</p>
        </div>
        <p className="text-foreground/70 my-2 md:hidden">{formatDate(data.created_at)}</p>
        <div className="flex items-center justify-between gap-4 md:gap-8 py-2 md:mt-2 md:justify-start">
          <div className="flex items-center gap-4 lg:gap-5 min-w-0">
            <Link to={`/profile/${data.profile_id}`} className="w-12 lg:w-14 h-12 lg:h-14 shrink-0" ><img src={data.profile_image ? `${MEDIA_URL}${data.profile_image}` : "/images/default_avatar.jpg"} alt="profile picture" className="w-full h-full object-cover rounded-full" /></Link>
            <Link to={`/profile/${data.profile_id}`} className="truncate lg:text-lg">{data.username}</Link>
          </div>
          {user.id !== data.profile_id && <Button variant="outline" className="w-28 md:w-32 rounded-full" onClick={data.is_following_author ? handleUnFollowBtnClick : handleFollowBtnClick} disabled={followLoading}>{followLoading ? <Spinner /> : data.is_following_author ? "Unfollow" : "Follow"}</Button>}
          <div className="hidden md:flex items-center gap-1">
            <Dot />
            <p className="text-foreground/70 lg:text-lg">{formatDate(data.created_at)}</p>
          </div>
        </div>
        <div className="flex justify-between items-center text-foreground/80 py-4.5 px-2 mt-4 lg:mt-6 border-y">
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2.5">
              {data.likes.some(like => like.id === user.id) ? <FaHeart className="text-2xl cursor-pointer" onClick={handleUnLikeStory} /> : <FaRegHeart className="text-2xl cursor-pointer" onClick={handleLikeStory} />}
              <LikesModal data={data.likes} setData={setData}>{data.likes.length}</LikesModal>
            </div>
            <div className="flex items-center gap-2.5">
              <FaRegComment className="text-2xl cursor-pointer" onClick={scrollToSection} />
              <span>{data.comments.length}</span>
            </div>
          </div>
          {data.is_saved ? <FaBookmark className="text-2xl cursor-pointer" onClick={handleUnSaveStory} /> : <FaRegBookmark className="text-2xl cursor-pointer" onClick={handleSaveStory} />}
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
        <p className="text-lg md:text-xl lg:text-2xl leading-loose pt-4 lg:pt-6">{data.content}</p>
      </div>
      <span ref={sectionRef}></span>
      <div className="border-t mt-12 lg:mt-14">
        <div className="mx-auto w-17/20 max-w-4xl">
          <div className="pt-12 lg:pt-14 pb-10 lg:pb-12 border-b">
            <span className="font-semibold text-2xl lg:text-3xl">{data.comments.length} {data.comments.length === 1 ? "Response" : "Responses"}</span>
            <div className="flex items-center gap-3 lg:gap-4 pt-8 lg:pt-10">
              <img src={user.image ? `${MEDIA_URL}${user.image}` : "/images/default_avatar.jpg"} alt="profile picture" className="w-10 lg:w-12 h-10 lg:h-12 object-cover rounded-full" />
              <span className="truncate lg:text-lg">{user.username}</span>
            </div>
            <div className="mt-3 lg:mt-4 bg-muted p-4 lg:p-6 rounded-sm">
              <Textarea placeholder="What are your thoughts?" className="shadow-none h-auto border-none lg:text-lg min-h-0 p-0 leading-relaxed dark:bg-transparent" value={responseData} onChange={e => handleResponseDataChange(e.target.value)} />
              <div className="pt-6 flex justify-end">
                <Button className="rounded-full w-26 lg:w-28 lg:h-10" onClick={handleAddResponse} disabled={respondBtnDisabled || responseLoading}>{responseLoading ? <Spinner /> : "Respond"}</Button>
              </div>
            </div>
          </div>
          <div className="pt-2 lg:pt-4 pb-30">
            {data.comments.map(e => <Comment {...e} removeResponse={removeResponse} my_comment={e.profile.id === user.id} key={e.id} />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Story