import { Button } from "@/components/ui/button"

const Navbar = () => {
  return (
    <div className="flex justify-center border-b border-b-foreground">
      <div className="w-17/20 flex justify-between items-center h-20 gap-2">
        <span className="font-logo text-2xl">Writespace</span>
        <Button className="rounded-full text-xs">Get started</Button>
      </div>
    </div>
  )
}

export default Navbar