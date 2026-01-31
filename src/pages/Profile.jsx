import { Outlet } from "react-router"
import { NavLink } from "react-router"
import FollowCountProfile from "@/components/mycomponents/followCountProfile/FollowCountProfile"
import { profileLinks } from "@/constants/ProfileLinks"
import { useEffect, useState, Fragment } from "react"
import LoadingPage from "@/components/mycomponents/loadingPage/LoadingPage"
import ErrorPage from "@/components/mycomponents/errorPage/ErrorPage"
import api from "@/api/api"
import { MEDIA_URL } from "@/lib/urls"
import { useParams } from "react-router"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"
import { CircleX } from "lucide-react"
import CustomToast from "@/components/mycomponents/toast/CustomToast"
import { useAuth } from "@/contexts/AuthContext"
import { Navigate } from "react-router"
import NotFoundPage from "@/components/mycomponents/notFoundPage/NotFoundPage"

const Profile = () => {
    const { auth: { user } } = useAuth()
    const { profile_id } = useParams()
    const [data, setData] = useState(null)
    const [pageLoading, setPageLoading] = useState(true)
    const [pageError, setPageError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const toggleFollowBtn = (is_following) => {
        setData(prevData => {
            return {
                ...prevData,
                profile: {
                    ...prevData.profile,
                    is_following,
                    followers_count: is_following ? prevData.profile.followers_count + 1 : prevData.profile.followers_count - 1
                }
            };
        });
    }

    const handleFollow = async () => {
        try {
            setLoading(true)
            await api.post(`follow/${profile_id}/`)
            toggleFollowBtn(true)
        } catch (e) {
            toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
        } finally {
            setLoading(false)
        }
    }
    const handleUnFollow = async () => {
        try {
            setLoading(true)
            await api.delete(`follow/${profile_id}/`)
            toggleFollowBtn(false)
        } catch (e) {
            toast.custom(t => <CustomToast t={t} message="An error occurred" icon={CircleX} iconStyles="text-red-500" />)
        } finally {
            setLoading(false)
        }
    }

    const getProfileData = async () => {
        try {
            const response = await api.get(`profile/${profile_id}/`)
            setData(response.data.data)
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
        getProfileData()
    }

    useEffect(() => {
        setPageLoading(true)
        setPageError(false)
        setNotFound(false)
        setData(null)

        getProfileData()
    }, [profile_id])

    if (Number(profile_id) === user.id) return <Navigate to="/my_profile" replace />
    if (pageLoading) return <LoadingPage className="h-[calc(100dvh-56px)]" />
    if (pageError) return <ErrorPage className="h-[calc(100dvh-56px)]" retryFn={handleReloadData} />
    if (notFound) return <NotFoundPage message="Profile not found" />
    return (
        <div className="mx-auto w-17/20 max-w-4xl">
            <div className="pt-6 pb-3 lg:pt-10 lg:pb-5 flex flex-col gap-4.5 md:gap-0 md:flex-row md:justify-between md:items-center">
                <div className="flex items-center gap-6 lg:gap-8">
                    <img src={data.profile.image ? `${MEDIA_URL}${data.profile.image}` : "/images/default_avatar.jpg"} alt="profile picture" className="w-20 lg:w-28 h-20 lg:h-28 rounded-full" />
                    <div className="flex-1 flex flex-col gap-2 lg:gap-4">
                        <span className="font-semibold text-lg md:text-2xl lg:text-4xl break-all leading-tight">{data.username}</span>
                        <div className="flex gap-4 lg:gap-4.5">
                            <FollowCountProfile text="Followers" count={data.profile.followers_count} route={`/followers/${profile_id}`} />
                            <FollowCountProfile text="Following" count={data.profile.following_count} route={`/following/${profile_id}`} />
                        </div>
                    </div>
                </div>
                <Button variant={data.profile.is_following ? "outline" : "default"} className="w-full md:w-56 rounded-full h-10" onClick={data.profile.is_following ? handleUnFollow : handleFollow} disabled={loading}>{loading ? <Spinner /> : data.profile.is_following ? "Unfollow" : "Follow"}</Button>
            </div>
            <div className="flex sticky top-14 z-20 bg-background">
                {profileLinks.map(e => {
                    return (
                        <Fragment key={e.route}>
                            <NavLink to={e.route} className={({ isActive }) => `py-3 lg:py-4 border-b-2 ${isActive ? "border-b-foreground text-foreground" : "border-muted text-foreground/70 hover:text-foreground"}`} end={e.route === "."}>{e.label}</NavLink>
                            <div className="border-b-2 border-muted w-6 lg:w-8"></div>
                        </Fragment>
                    )
                })}
                <div className="border-b-2 border-muted flex-1"></div>
            </div>
            <Outlet />
        </div>
    )
}

export default Profile