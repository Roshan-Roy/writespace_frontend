import * as z from "zod"

const minErrorMsg = (field, n) => `${field} must be at least ${n} characters long`;
const maxErrorMsg = (field, n) => `${field} cannot exceed ${n} characters`;

export const formatErrors = (errors) => {
    return errors.reduce((acc, issue) => {
        const field = issue.path[0];
        acc[field] = issue.message;
        return acc;
    }, {});
}

export const signupSchema = z.object({
    username: z
        .string()
        .min(3, minErrorMsg("Username", 3))
        .max(20, maxErrorMsg("Username", 20))
        .trim(),
    email: z.email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, minErrorMsg("Password", 8))
        .max(32, maxErrorMsg("Password", 32))
});

export const signinSchema = z.object({
    username: z.string().min(3).max(20).trim(),
    password: z.string().min(8).max(32)
});

export const forgotPasswordSchema = z.object({
    email: z.email("Please enter a valid email address")
});