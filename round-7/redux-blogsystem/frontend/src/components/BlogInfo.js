import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import blogService from "../services/blogs"


const BlogInfo = ({ blogs }) => {
    const blogId = useParams().id
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const wantedBlog = blogs.find(blog => blog.id === blogId)

    useEffect(() => {
        blogService.getComments(blogId).then(commentList => {
            setComments(commentList)
        })
    }, [blogId])

    if (!wantedBlog) {
        return null
    }

    const addNewComment = (event) => {
        event.preventDefault()

        try {
            const commentToBeAdded = {
                comment: newComment
            }
            blogService.addComment(blogId, commentToBeAdded)
            setNewComment('')
            setComments(comments.concat(commentToBeAdded))
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <h1>Blog <i>{wantedBlog.title}</i> by {wantedBlog.author}</h1>
            <p>Url: <Link to={{pathname: wantedBlog.url}}>{wantedBlog.url}</Link></p>
            <p>Likes: {wantedBlog.likes}</p>
            <p>added by <Link to={`/users/${wantedBlog.users[0].id}`}>{wantedBlog.users[0].name}</Link></p>
            <br />
            <h3>Comments:</h3>
            <form onSubmit={addNewComment}>
                <label>Add comment:</label>
                <input type="text" id="comment" name="comment" onChange={({ target }) => setNewComment(target.value)}/>
                <input type="submit" value="Add comment" />
            </form>
            <ul>
                {comments.map(comment => 
                    <li key={comment.comment}>{comment.comment}</li>   
                )}
            </ul>
        </div>
    )

}

export default BlogInfo