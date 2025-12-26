const FollowCountProfile = ({ text, count }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-1.5 lg:gap-2 text-sm lg:text-lg"><span className="font-semibold">{count}</span><span className="text-foreground/80">{text}</span></div>
    )
}

export default FollowCountProfile