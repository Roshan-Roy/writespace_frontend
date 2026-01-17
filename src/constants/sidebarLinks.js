import { Home, Bookmark, User } from "lucide-react";

const sidebarLinks = [
    {
        label: "Home",
        route: "/",
        icon: Home,
    },
    {
        label: "Saved",
        route: "/saved",
        icon: Bookmark,
    },
    {
        label: "Profile",
        route: "/my_profile",
        icon: User,
    },
];

export default sidebarLinks
