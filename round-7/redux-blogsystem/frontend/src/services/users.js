import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const exportedObject = { getUsers }
export default exportedObject