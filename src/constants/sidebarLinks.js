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
        route: "/profile",
        icon: User,
    },
];

export default sidebarLinks
