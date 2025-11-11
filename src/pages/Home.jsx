import { Button } from "@/components/ui/button"

const Home = () => {
    return (
        <div className="flex flex-col items-center h-[calc(100dvh-80px)]">
            <div className="flex-1 flex flex-col justify-center w-17/20 gap-3">
                <h1 className="font-heading text-[52px] leading-tight">Open<br />minds <span className="whitespace-nowrap">& words</span></h1>
                <h2 className="text-xl">Write, read, and share stories that live beyond the page</h2>
                <Button className="self-start mt-5 rounded-full bg-[#1A8917]" size="lg">Start Reading</Button>
            </div>
            <div className="border border-t-foreground w-full h-15">
                hello
            </div>
        </div>
    )
}

export default Home