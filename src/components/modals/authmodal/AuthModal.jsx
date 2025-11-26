import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "./InputError"

export function AuthModal({ open, setOpen }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <span className="hidden sm:inline">Sign in</span>
                </DialogTrigger>
                <DialogContent className="max-w-full sm:max-w-sm h-dvh flex flex-col gap-6 p-8 justify-center sm:h-auto border-0 sm:border rounded-none sm:rounded-lg">
                    <DialogTitle className="text-3xl text-center font-heading">Sign up</DialogTitle>
                    <div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" placeholder="Enter username" className="h-11 px-4 rounded-2xl" />
                        </div>
                        <InputError />
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" placeholder="Enter email" className="h-11 px-4 rounded-2xl" />
                        </div>
                        <InputError />
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="Enter password" className="h-11 px-4 rounded-2xl" aria-invalid={false} />
                        </div>
                        <InputError />
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}
