import SidebarLink from "./sidebarLink/SidebarLink"
import sidebarLinks from "@/constants/sidebarLinks"
import { useLayout } from "../mainLayout/MainLayout"
import { useEffect } from "react"

const SidebarWrapper = ({ children }) => {
    const { sidebarOpen, setSidebarOpen } = useLayout()

    const handleCloseSidebar = () => {
        setSidebarOpen(false)
    }

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 1024

            if (sidebarOpen && isMobile) {
                document.body.style.overflow = "hidden"
            } else {
                document.body.style.overflow = "auto"
            }
        };

        handleResize()

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize)
            document.body.style.overflow = "auto"
        };
    }, [sidebarOpen])

    return (
        <>
            <div className={`bg-black/20 h-[calc(100dvh-56px)] fixed top-14 left-0 w-full transition-all lg:hidden ${sidebarOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={handleCloseSidebar} />
            <div className={`bg-background lg:border-r h-[calc(100dvh-56px)] fixed top-14 left-0 w-60 transition-all shadow-xl lg:shadow-none dark:shadow-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col gap-6 py-8 px-2">
                    {sidebarLinks.map(e => <SidebarLink {...e} />)}
                </div>
            </div>
            <div className={`lg:transition-all ${sidebarOpen ? "lg:ml-60" : "lg:ml-0"}`}>
                {children}
            </div>
        </>
    )
}

export default SidebarWrapper