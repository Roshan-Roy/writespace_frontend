import { Info } from "lucide-react"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import SwitchThemeButtonHomeAbout from "@/components/mycomponents/switchThemeButtons/SwitchThemeButtonHomeAbout"

const Home = () => {
    return (
        <div className="flex flex-col items-center h-[calc(100dvh-80px)] bg-background-home">
            <div className="flex-1 flex flex-col justify-center w-17/20 gap-3 lg:gap-5 sm:text-center">
                <h1 className="font-heading text-[54px] sm:text-[70px] lg:text-[90px] leading-tight">Open<br />minds <span className="whitespace-nowrap">& words</span></h1>
                <h2 className="text-xl lg:text-2xl">Write, read, and share stories that live beyond the page</h2>
                <Button className="self-start sm:self-center mt-5 rounded-full px-7 lg:px-10 lg:h-12 lg:text-base" size="lg">Start Reading</Button>
            </div>
            <div className="border-t border-t-foreground w-full flex justify-center">
                <div className="h-15 lg:h-17 w-17/20 flex items-center sm:justify-center gap-3 lg:gap-4">
                    <Link to="about"><Info className="lg:w-7 lg:h-7" /></Link>
                    <SwitchThemeButtonHomeAbout/>
                </div>
            </div>
        </div>
    )
}

export default Home