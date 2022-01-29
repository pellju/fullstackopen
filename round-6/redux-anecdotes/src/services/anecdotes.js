import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (anecdote) => {
    const object = { content: anecdote, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const increaseVote = async (anecdoteID) => {
    const listOfAnecdotes = await getAll()
    const anecdote = listOfAnecdotes.find(a => a.id === anecdoteID)

    if (anecdote === null || anecdote === undefined) {
        console.log("not found")
    } else {
        const replacedAnecdote = { content: anecdote.content, id: anecdoteID, votes: anecdote.votes + 1 }
        const response = await axios.put(baseUrl + "/" + anecdoteID, replacedAnecdote)
        return response.data 
    }
}

export default { getAll, createAnecdote, increaseVote }