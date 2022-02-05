import { useParams } from "react-router-dom"

const User = ({ users }) => {
    const userId = useParams().id
    const wantedUser = users.find(user => user.id === userId)
    
    if (!wantedUser) {
        return null
    }

    return (
        <div>
            <h1>User <i>{wantedUser.name}</i></h1>
            <p>- has added following blogs:</p>
            <ul>
                {wantedUser.blogs.map(blog => 
                    <li><b>{blog.title}</b></li>
                )}
            </ul>
        </div>
    )
}

export default User