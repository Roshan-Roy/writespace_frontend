import maskEmail from "@/lib/maskEmail"

const SignoutButton = () => {
    return (
        <div className="flex flex-col select-none gap-1.5 px-6 pt-6 pb-8 text-foreground/80 hover:text-foreground">
            <span>Sign out</span>
            <span className="text-xs truncate">{maskEmail("roshanroy2911@gmail.com")}</span>
        </div>
    )
}

export default SignoutButton