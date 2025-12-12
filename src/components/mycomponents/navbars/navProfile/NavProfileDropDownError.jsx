import { CircleAlert } from "lucide-react"

const NavProfileDropDownError = () => {
    return (
        <div className="flex gap-4 justify-center items-center py-4">
            <CircleAlert />
            <span>An error occurred</span>
        </div>
    )
}

export default NavProfileDropDownError