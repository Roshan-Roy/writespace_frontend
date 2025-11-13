import { Sun, Moon } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"

const SwitchThemeButtonHomeAbout = () => {
    const { theme, switchToDark, switchToLight } = useTheme()
    return theme === "dark" ? <Moon className="cursor-pointer lg:w-7 lg:h-7" onClick={switchToLight} /> : <Sun className="cursor-pointer lg:w-7 lg:h-7" onClick={switchToDark} />

}

export default SwitchThemeButtonHomeAbout