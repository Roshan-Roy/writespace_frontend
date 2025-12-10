import { NavLink } from "react-router";

const SidebarLink = ({ label, route, icon: Icon, handleCloseNavbar }) => {
    return (
        <>
            <NavLink
                to={route}
                onClick={handleCloseNavbar}
                className={({ isActive }) =>
                    `lg:hidden flex box-border items-center px-5.5 gap-4 border-l-2 ${isActive
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`
                }
            >
                <Icon />
                <span className="font-semibold">{label}</span>
            </NavLink>

            <NavLink
                to={route}
                className={({ isActive }) =>
                    `hidden lg:flex box-border items-center px-5.5 gap-4 border-l-2 ${isActive
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`
                }
            >
                <Icon />
                <span className="font-semibold">{label}</span>
            </NavLink>
        </>
    );
};

export default SidebarLink