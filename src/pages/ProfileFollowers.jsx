import { Link } from "react-router"
import { useEffect, useState } from "react"
import api from "@/api/api"
import LoadingPage from "@/components/mycomponents/loadingPage/LoadingPage"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import FollowUnfollowCard from "@/components/mycomponents/followCards/FollowUnfollowCard"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useAuth } from "@/contexts/AuthContext"
import { useParams } from "react-router"
import { Navigate } from "react-router"
import NotFoundPage from "@/components/mycomponents/notFoundPage/NotFoundPage"

const ProfileFollowers = () => {
  const { auth: { user } } = useAuth()
  const { profile_id } = useParams()
  const [data, setData] = useState([])
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const profileLink = `/profile/${profile_id}/`

  const sortedData = (data) => {
    const myProfile = []
    const following = []
    const notFollowing = []
    data.forEach(e => {
      if (e.id === user.id) {
        myProfile.push(e)
      } else if (e.is_following) {
        following.push(e)
      } else {
        notFollowing.push(e)
      }
    })
    return [...myProfile, ...following, ...notFollowing]
  }

  const getFollowersAndUsername = async () => {
    try {
      const response = await api.get(`followers/${profile_id}/`)
      setUsername(response.data.username)
      setData(sortedData(response.data.data))
    } catch (e) {
      const status = e.response?.status
      if (status === 404) {
        setNotFound(true)
      } else {
        setError(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleReloadData = () => {
    setError(false)
    setLoading(true)
    getFollowersAndUsername()
  }

  useEffect(() => {
    getFollowersAndUsername()
  }, [])

  if (Number(profile_id) === user.id) return <Navigate to="/my_followers" replace />
  if (loading) return <LoadingPage className="h-[calc(100dvh-56px)]" />
  if (error) return <ErrorPage className="h-[calc(100dvh-56px)]" retryFn={handleReloadData} />
  if (notFound) return <NotFoundPage message="Profile not found" />
  return (
    <div className="mx-auto w-17/20 max-w-4xl">
      <div className="pt-6 lg:pt-10">
        <Breadcrumb className="mb-3 lg:mb-5">
          <BreadcrumbList className="lg:text-base">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={profileLink}>{username}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Followers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <span className="font-semibold text-2xl sm:text-4xl lg:text-5xl">{data.length} Followers</span>
      </div>
      <div className="pt-4 pb-8 lg:pt-6 lg:pb-12 flex flex-col gap-1">
        {data.map(e => <FollowUnfollowCard {...e} my_profile={e.id === user.id} key={e.id} />)}
      </div>
    </div>

  )
}


export default ProfileFollowers