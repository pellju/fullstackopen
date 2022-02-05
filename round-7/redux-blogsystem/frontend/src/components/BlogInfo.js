import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const BlogInfo = ({ blogs }) => {
    const blogId = useParams().id
    const wantedBlog = blogs.find(blog => blog.id === blogId)

    if (!wantedBlog) {
        return null
    }

    console.log(wantedBlog)

    return (
        <div>
            <h1>Blog <i>{wantedBlog.title}</i> by {wantedBlog.author}</h1>
            <p>Url: <Link to={{pathname: wantedBlog.url}}>{wantedBlog.url}</Link></p>
            <p>Likes: {wantedBlog.likes}</p>
            <p>added by <Link to={`/users/${wantedBlog.users[0].id}`}>{wantedBlog.users[0].name}</Link></p>
        </div>
    )

}

export default BlogInfo