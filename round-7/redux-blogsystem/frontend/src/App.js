import React, { useState, useEffect, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import LoginForm from './components/Login'
import AddingBlogForm from './components/AddBlog'
import PropTypes from 'prop-types'

//import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  //Redirect,
  //useRouteMatch,
  //useHistory
} from 'react-router-dom'
import userService from './services/users'
import User from './components/User'
import BlogInfo from './components/BlogInfo'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

const Success = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const removeBlog = async (blog, setBlogs) => {
  const blogId = blog.id.toString()

  try {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      const response = await blogService.removeBlog(blogId)
      setBlogs(response)
    }
  } catch (e) {
    console.log(e)
  }
}

const increaseLike = async (blog, setBlogs) => {

  try {
    const response = await blogService.addLike(blog.title, blog.author, blog.url, blog.likes + 1, blog.id).then()
    setBlogs(response)
  } catch (e) {
    console.log(e)
  }
}

const RouteData = ({errorMessage, successMessage, setSuccessMessage, setErrorMessage, user, loginForm, handleLogout, blogs, setBlogs, setAuthor, author, setUrl, url, setTitle, title, users}) => {
  const newPadding = {
    padding: 5
  }
  
  return (
    <Router>
        <div className="padding">
          <Link style={newPadding} to="/">Blogs</Link>           
          <Link style={newPadding} to="/users/">Users</Link>
          {user !== null && 
            <div>Logged in as <b>{user.name}</b>!<form onSubmit={handleLogout}><button type='submit'>Logout</button></form></div>
          }
        </div>
        <Switch>
            <Route path="/users/:id">
                <User users={users}/>
            </Route>
            <Route path="/users">
                <UserList users={users}/>
            </Route>
            <Route path="/blogs/:id">
                <BlogInfo blogs={blogs} />
            </Route>
            <Route path="/">
                <BlogList errorMessage={errorMessage} successMessage={successMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} user={user} loginForm={loginForm} handleLogout={handleLogout} blogs={blogs} setBlogs={setBlogs} setAuthor={setAuthor} author={author} setUrl={setUrl} url={url} setTitle={setTitle} title={title}/>
            </Route>
        </Switch>
    </Router>
  )
}

const BlogList = ({errorMessage, successMessage, setSuccessMessage, setErrorMessage, user, loginForm, handleLogout, blogs, setBlogs, setAuthor, author, setUrl, url, setTitle, title}) => {
  return (
    <div className='blogList'>
      <Error message={errorMessage} />
      <Success message={successMessage} />
      <h2>Blogs:</h2>
      {user === null && loginForm()}
      {user !== null && BlogForm({ user, handleLogout, setSuccessMessage, setErrorMessage, blogs, setBlogs, setAuthor, author, setUrl, url, setTitle, title })}
    </div>
  )
}

const UserList = ({ users }) => {
  return (
      <div className='userList'>
          <h2>Users and their amount of blogs:</h2>
          {users.map(user =>
            <div key={user.name}>
              <div><b><Link to={`/users/${user.id}`}>{user.name}</Link></b> - {user.blogs.length}</div>
            </div>
          )}
      </div>
  )
}


const BlogForm = ({ user, handleLogout, setSuccessMessage, setErrorMessage, blogs, setBlogs, setAuthor, author, setUrl, url, setTitle, title }) => {
  blogs.sort(function(a,b) {
    return b.likes - a.likes
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div>
      User {user.name} has logged in. <form onSubmit={handleLogout}><button type='submit'>Logout</button></form>

      < AddingBlogForm setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} setBlogs={setBlogs} setAuthor={setAuthor} author={author} setUrl={setUrl} url={url} setTitle={setTitle} title={title} />
      {blogs.map(blog =>
        <div style={blogStyle} key={blog.title}>
          <div>< Blog blog={blog} setBlogs={setBlogs}/></div>
          <div><button onClick={() => increaseLike(blog, setBlogs)}>Like Blog</button><button onClick={() => removeBlog(blog, setBlogs)}>Remove blog</button></div>
          <br></br>
        </div>
      )}
    </div>

  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const [loginShown, setLoginShown] = useState(false)
  const [users, setUsers] = useState([])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('userIdentification', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`User ${user.name} successfully logged in.`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (e) {
      setErrorMessage('Error: wrong username or password!')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('userIdentification')
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const hasUserLoggedIn = window.localStorage.getItem('userIdentification')
    if (hasUserLoggedIn) {
      const user = JSON.parse(hasUserLoggedIn)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    userService.getUsers().then(usersFromBackend => {
      setUsers(usersFromBackend)
    })
  }, [])

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Login'>
        < LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} loginShown={loginShown} setLoginShown={setLoginShown} />
      </Togglable>
    )
  }

  return (
    <div className="basics">
      <RouteData errorMessage={errorMessage} successMessage={successMessage} setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} user={user} loginForm={loginForm} handleLogout={handleLogout} blogs={blogs} setBlogs={setBlogs} setAuthor={setAuthor} author={author} setUrl={setUrl} url={url} setTitle={setTitle} title={title} users={users}/>
    </div>
  )
}

export default App