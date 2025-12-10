import SidebarLink from "./sidebarLink/SidebarLink"
import sidebarLinks from "@/constants/sidebarLinks"

const SidebarWrapper = ({ children, open, setOpen }) => {
    const handleCloseNavbar = () => {
        setOpen(false)
    }
    return (
        <>
            <div className={`bg-black/20 h-[calc(100dvh-56px)] fixed top-14 left-0 w-full transition-all lg:hidden ${open ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={handleCloseNavbar} />
            <div className={`bg-background lg:border-r h-[calc(100dvh-56px)] fixed top-14 left-0 w-60 transition-all shadow-xl lg:shadow-none ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col gap-6 py-8 px-2">
                    {sidebarLinks.map(e => <SidebarLink handleCloseNavbar={handleCloseNavbar} {...e} />)}
                </div>
            </div>
            <div className={`lg:transition-all ${open ? "lg:ml-60" : "lg:ml-0"}`}>
                {children}
            </div>
        </>
    )
}

export default SidebarWrapper