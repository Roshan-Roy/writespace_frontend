import { Link } from "react-router"
import { useEffect, useState } from "react"
import api from "@/api/api"
import LoadingPage from "@/components/mycomponents/loadingPage/LoadingPage"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import MyFollowersCard from "@/components/mycomponents/followCards/MyFollowersCard"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useAuth } from "@/contexts/AuthContext"

const MyProfileFollowers = () => {
  const { auth: { user } } = useAuth()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getMyFollowersAndDetails = async () => {
    try {
      const response = await api.get("followers/")
      setData(response.data.data)
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  const filterFollowersById = (id) => {
    setData(prevData => prevData.filter(e => e.id !== id))
  }
  const handleReloadData = () => {
    setError(false)
    setLoading(true)
    getMyFollowersAndDetails()
  }

  useEffect(() => {
    getMyFollowersAndDetails()
  }, [])

  if (loading) return <LoadingPage className="h-[calc(100dvh-56px)]" />
  if (error) return <ErrorPage className="h-[calc(100dvh-56px)]" retryFn={handleReloadData} />
  return (
    <div className="mx-auto w-17/20 max-w-4xl">
      <div className="pt-6 lg:pt-10">
        <Breadcrumb className="mb-3 lg:mb-5">
          <BreadcrumbList className="lg:text-base">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/profile">{user.username}</Link>
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
        {data.map(e => <MyFollowersCard {...e} filterFollowersById={filterFollowersById} key={e.id} />)}
      </div>
    </div>

  )
}


export default MyProfileFollowers