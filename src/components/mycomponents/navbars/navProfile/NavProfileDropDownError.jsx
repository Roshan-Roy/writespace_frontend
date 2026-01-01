import { CircleAlert } from "lucide-react"

const NavProfileDropDownError = () => {
    return (
        <div className="flex gap-3 lg:gap-4 justify-center items-center py-4">
            <CircleAlert />
            <span className="text-sm lg:text-base">An error occurred</span>
        </div>
    )
}

export default NavProfileDropDownError