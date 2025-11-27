import { DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "./InputError"
import { Button } from "@/components/ui/button"

const SignUpForm = ({ setOpenModal }) => {
    const handleFormChange = () => {
        setOpenModal("signin")
    }
    return (
        <form className="flex flex-col gap-8">
            <DialogTitle className="text-3xl text-center font-heading">Sign up</DialogTitle>
            <div>
                <div className="flex flex-col gap-2 w-full">
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
                <Button className="w-full mt-3 h-11 rounded-2xl">Sign Up</Button>
            </div>
            <p className="text-center text-sm">Already have an account? <u onClick={handleFormChange} className="cursor-default">Sign in</u></p>
        </form>
    )
}

export default SignUpForm