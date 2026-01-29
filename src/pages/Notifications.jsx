import { useEffect, useState } from "react"
import api from "@/api/api"
import StoryCardSkeleton from "@/components/mycomponents/storyCards/StoryCardSkeleton"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import NoItemsPage from "@/components/mycomponents/noItemsPage/NoItemsPage"
import { BellOff } from "lucide-react"
import NotificationCard from "@/components/mycomponents/notificationCard/NotificationCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useNotifications } from "@/contexts/NotificationContext"

const Notifications = () => {
  const { clearCount } = useNotifications()
  const [data, setData] = useState([])
  const [pageLoading, setPageLoading] = useState(true)
  const [pageError, setPageError] = useState(false)

  const getNotifications = async () => {
    try {
      const response = await api.get("notifications/")
      const notifications = response.data.data

      setData(notifications)

      if (notifications.length > 0) {
        await api.delete("notifications/")
        clearCount()
      }

    } catch (e) {
      setPageError(true)
    } finally {
      setPageLoading(false)
    }
  }

  const handleReloadData = () => {
    setPageError(false)
    setPageLoading(true)
    getNotifications()
  }

  useEffect(() => {
    getNotifications()
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

  if (pageError)
    return (
      <ErrorPage
        retryFn={handleReloadData}
        className="h-[calc(100dvh-56px)]"
      />
    )

  if (data.length === 0)
    return (
      <NoItemsPage
        icon={BellOff}
        message="No notifications"
        className="h-[calc(100dvh-56px)]"
      />
    )

  return (
    <div className="mx-auto w-17/20 max-w-4xl">
      <div className="pt-6 lg:pt-10 pb-16 lg:pb-20 flex flex-col gap-2">
        {data.map(e => (
          <NotificationCard {...e} key={e.id} />
        ))}
      </div>
    </div>
  )
}

export default Notifications
