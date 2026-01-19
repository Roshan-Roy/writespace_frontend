import { Home, Bookmark, User, Compass } from "lucide-react";

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
    {
        label: "Topics",
        route: "/topics",
        icon: Compass,
    },
];

export default sidebarLinks
