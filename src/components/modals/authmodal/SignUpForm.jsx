import { DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputError from "./InputError"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import * as z from "zod"

const minError = (field, n) => `${field} must be at least ${n} characters long`;
const maxError = (field, n) => `${field} cannot exceed ${n} characters`;
const formatErrors = (errors) => {
    return errors.reduce((acc, issue) => {
        const field = issue.path[0];
        acc[field] = issue.message;
        return acc;
    }, {});
}
const signupSchema = z.object({
    username: z
        .string()
        .min(3, minError("Username", 3))
        .max(20, maxError("Username", 20))
        .trim(),
    email: z.email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, minError("Password", 8))
        .max(32, maxError("Password", 32)),
});


const SignUpForm = ({ setOpenModal }) => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleFormChange = () => {
        setOpenModal("signin")
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()

        const result = signupSchema.safeParse(data);
        if (result.success) {
            console.log('Valid user data:', result.data);
        } else {
            console.error('Validation errors:', formatErrors(result.error.issues));
        }
    }
    const handleInputChange = (value, fieldName) => {
        setData(prevData => ({ ...prevData, [fieldName]: value }))
    }

    return (
        <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
            <DialogTitle className="text-3xl text-center font-heading">Sign up</DialogTitle>
            <div>
                <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter username" className="h-11 px-4 rounded-2xl" value={data.username} onChange={e => handleInputChange(e.target.value, "username")} />
                </div>
                <InputError />
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter email" className="h-11 px-4 rounded-2xl" value={data.email} onChange={e => handleInputChange(e.target.value, "email")} />
                </div>
                <InputError />
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter password" className="h-11 px-4 rounded-2xl" value={data.password} onChange={e => handleInputChange(e.target.value, "password")} />
                </div>
                <InputError />
                <Button className="w-full mt-3 h-11 rounded-2xl">Sign Up</Button>
            </div>
            <p className="text-center text-sm">Already have an account? <u onClick={handleFormChange} className="cursor-default">Sign in</u></p>
        </form>
    )
}

export default SignUpForm