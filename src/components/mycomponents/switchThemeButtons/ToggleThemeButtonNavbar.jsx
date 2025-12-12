import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

const ToggleThemeButtonNavbar = () => {
    const { theme, switchToDark, switchToLight } = useTheme()
    return (
        <div className="flex gap-4 items-center px-6 py-4 select-none cursor-pointer text-foreground/70 hover:text-foreground" onClick={theme === "dark" ? switchToLight : switchToDark}>
            {theme === "dark" ? <Moon /> : <Sun />}
            <span>Toggle theme</span>
        </div>
    )
}

export default ToggleThemeButtonNavbar