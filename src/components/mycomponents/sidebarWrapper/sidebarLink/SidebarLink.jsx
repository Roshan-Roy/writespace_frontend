import { NavLink } from "react-router";
import { useLayout } from "../../mainLayout/MainLayout"

const SidebarLink = ({ label, route, icon: Icon }) => {
    const { setSidebarOpen } = useLayout()

    const handleCloseSidebar = () => {
        setSidebarOpen(false)
    }
    return (
        <>
            <NavLink
                to={route}
                onClick={handleCloseSidebar}
                className={({ isActive }) =>
                    `lg:hidden flex items-center px-5.5 gap-4 border-l-2 ${isActive
                        ? "border-foreground text-foreground"
                        : "border-transparent text-foreground/70 hover:text-foreground"
                    }`
                }
            >
                <Icon />
                <span>{label}</span>
            </NavLink>

            <NavLink
                to={route}
                className={({ isActive }) =>
                    `hidden lg:flex items-center px-5.5 gap-4 border-l-2 ${isActive
                        ? "border-foreground text-foreground"
                        : "border-transparent text-foreground/70 hover:text-foreground"
                    }`
                }
            >
                <Icon />
                <span>{label}</span>
            </NavLink>
        </>
    );
};

export default SidebarLink