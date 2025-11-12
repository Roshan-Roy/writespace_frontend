import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <div className="flex justify-center border-b border-b-foreground bg-background-home">
      <div className="w-17/20 flex justify-between items-center h-20 gap-2">
        <span className="font-logo text-2xl lg:text-3xl">Writespace</span>
        <Button className="rounded-full text-xs lg:text-sm lg:h-10 lg:px-6">Get started</Button>
      </div>
    </div>
  )
}

export default Navbar