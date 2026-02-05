import { Link } from "react-router"

const TopicCard = ({ id, name }) => {
    return (
        <Link className="inline-block bg-muted mb-2.5 mr-3 px-6 py-2 rounded-full" to={`/topic/${id}`}>
            <span className="text-foreground/90 whitespace-nowrap text-sm">{name}</span>
        </Link>
    )
}

export default TopicCard