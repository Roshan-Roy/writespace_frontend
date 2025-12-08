import { Link } from "react-router"

const SidebarLink = ({ label, route, icon: Icon }) => {
    return (
        <Link className="flex items-center text-muted-foreground px-8 gap-4">
            <Icon/>
            <span className="font-semibold">{label}</span>
        </Link>
    )
}

export default SidebarLink