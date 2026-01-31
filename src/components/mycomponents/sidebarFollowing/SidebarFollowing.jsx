import SidebarFollowingCard from "./sidebarFollowingCard/sidebarFollowingCard"
import { Link } from "react-router"
import { useEffect, useState } from "react"
import api from "@/api/api"

const SidebarFollowing = () => {
    const [data, setData] = useState([])

    const getMyFollowing = async () => {
        try {
            const response = await api.get("following/")
            setData(response.data.data)
        } catch (e) {
            setData([])
        }
    }

    useEffect(() => {
        getMyFollowing()
    }, [])
    return (
        <div className="border-t pt-8 pb-12 flex flex-col gap-2">
            {data.slice(0, 5).map(e => <SidebarFollowingCard {...e} key={e.id} />)}
            <Link to="/my_following" className={`hover:underline text-foreground/70 hover:text-foreground text-sm ${data.length === 0 ? "mt-0" : "mt-4"}`}>See all following</Link>
        </div>
    )
}

export default SidebarFollowing