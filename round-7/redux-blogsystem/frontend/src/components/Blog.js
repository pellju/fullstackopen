import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const [showingBlog, setShowingBlog] = useState(false)

  const hideBlog = { display: showingBlog ? 'none' : '' }
  const showBlog = { display: showingBlog ? '' : 'none' }

  const listBlogs = () => {
    return (
      <div>
        <div style={hideBlog}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> - {blog.author} <button onClick={() => setShowingBlog(true)}>View blog info</button>
        </div>
        <div style={showBlog}>
          <div><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> - {blog.author} <button onClick={() => setShowingBlog(false)}>Hide blog info</button></div>
          <div>Url: {blog.url}</div>
          <div>Likes: {blog.likes}</div>
          <div>Added by: {blog.users[0].name}</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {listBlogs()}
    </div>
  )
}

export default Blog