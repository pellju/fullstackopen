import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = (userToken) => {
  token = `bearer ${userToken}`
}

const addBlog = async (newBlog) => {
  const requiredHeaders =  { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, requiredHeaders)
  return response.data
}

const addLike = async (title, author, url, likes, id) => {
  let newUrl = `${baseUrl}/${id}`

  const newBlog = {
    title: title,
    author: author,
    url: url,
    likes: likes
  }

  const requiredHeaders =  { headers: { Authorization: token } }
  const response = await axios.put(newUrl, newBlog, requiredHeaders)
  return response.data
}

const removeBlog = async (id) => {
  let newUrl = `${baseUrl}/${id}`
  const requiredHeaders =  { headers: { Authorization: token } }
  const response = await axios.delete(newUrl, requiredHeaders)
  return response.data
}

const getComments = async (id) => {
  const commentUrl = `http://localhost:3003/api/blogs/${id}/comments`
  const request = axios.get(commentUrl)
  return request.then(comments => comments.data)
}

const addComment = async (id, newComment) => {
  const commentUrl = `http://localhost:3003/api/blogs/${id}/comments`
  const response = axios.post(commentUrl, newComment)
  return response.then(comments => comments)
}

const exportedObject = {getAll, setToken, addBlog, addLike, removeBlog, getComments, addComment}
export default exportedObject