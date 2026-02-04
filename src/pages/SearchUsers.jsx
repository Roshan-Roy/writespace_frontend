import { useEffect, useState } from "react"
import api from "@/api/api"
import UserCardSearchSkeleton from "@/components/mycomponents/userCardSearch/UserCardSearchSkeleton"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import NoItemsPage from "@/components/mycomponents/noItemsPage/NoItemsPage"
import { UserX } from "lucide-react"
import UserCardSearch from "@/components/mycomponents/userCardSearch/UserCardSearch"
import { useSearchParams } from "react-router"
import sortedProfiles from "@/lib/sortedProfiles"
import { useAuth } from "@/contexts/AuthContext"

const SearchUsers = () => {
  const { auth: { user } } = useAuth()
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get("q")
  const [data, setData] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState(false)

  const searchUsers = async () => {
    try {
      const response = await api.get(`search_users?q=${searchTerm.trim()}`)
      setData(sortedProfiles(response.data.data, user.id))
    } catch (e) {
      setPageError(true)
    } finally {
      setPageLoading(false)
    }
  }
  const handleReloadData = () => {
    setPageError(false)
    setPageLoading(true)
    searchUsers()
  }

  useEffect(() => {
    setPageLoading(true)
    setPageError(false)
    setData([])

    searchUsers()
  }, [searchTerm])

  if (pageLoading) return (
    <div className="pt-4 md:pt-6 pb-8 md:pb-12 flex flex-col gap-1">
      {Array.from({ length: 10 }, (_, i) => (
        <UserCardSearchSkeleton key={i} />
      ))}
    </div>
  )
  if (pageError) return <ErrorPage retryFn={handleReloadData} className="h-auto py-20 md:py-28" />
  if (data.length === 0) return <NoItemsPage icon={UserX} message="No people" className="py-24 md:py-32" />
  return (
    <div className="pt-4 md:pt-6 pb-8 md:pb-12 flex flex-col gap-1">
      {data.map(e => <UserCardSearch {...e} key={e.id} />)}
    </div>
  )
}

export default SearchUsers