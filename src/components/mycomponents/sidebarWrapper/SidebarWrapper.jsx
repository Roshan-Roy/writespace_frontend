const SidebarWrapper = ({ children, open, setOpen }) => {
    const handleCloseNavbar = () => {
        setOpen(false)
    }
    return (
        <>
            <div className={`bg-black/20 h-[calc(100dvh-56px)] fixed top-14 left-0 w-full transition-all lg:hidden ${open ? "opacity-50" : "opacity-0 pointer-events-none"}`} onClick={handleCloseNavbar} />
            <div className={`bg-background border-r h-[calc(100dvh-56px)] fixed top-14 left-0 w-60 transition-all ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <p>Sidebar</p>
            </div>
            <div className={`lg:transition-all ${open ? "lg:ml-60" : "lg:ml-0"}`}>
                {children}
            </div>
        </>
    )
}

export default SidebarWrapper