import { Link } from "react-router"
import { useEffect, useState } from "react"
import api from "@/api/api"
import LoadingPage from "@/components/mycomponents/loadingPage/LoadingPage"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import MyFollowingCard from "@/components/mycomponents/followCards/MyFollowingCard"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const MyProfileFollowing = () => {
  const [username, setUsername] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getMyFollowingAndDetails = async () => {
    try {
      const [responseOne, responseTwo] = await Promise.all([
        api.get("my_profile/"),
        api.get("following/")
      ])
      setUsername(responseOne.data.data.username)
      setData(responseTwo.data.data)
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  const filterFollowingById = (id) => {
    setData(prevData => prevData.filter(e => e.id !== id))
  }
  const handleReloadData = () => {
    setError(false)
    setLoading(true)
    getMyFollowingAndDetails()
  }

  useEffect(() => {
    getMyFollowingAndDetails()
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
                <Link to="/profile">{username}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Following</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <span className="font-semibold text-2xl sm:text-4xl lg:text-5xl">{data.length} Following</span>
      </div>
      <div className="pt-4 pb-8 lg:pt-6 lg:pb-12 flex flex-col gap-1">
        {data.map(e => <MyFollowingCard {...e} filterFollowingById={filterFollowingById} key={e.id} />)}
      </div>
    </div>

  )
}


export default MyProfileFollowing