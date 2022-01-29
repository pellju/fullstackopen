import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { customizedNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = async (event) => {
        event.preventDefault()
        const anecdoteData = event.target.anecdote.value
        const addAnecdote = await anecdoteService.createAnecdote(anecdoteData)
        dispatch(newAnecdote(addAnecdote))
        dispatch(customizedNotification(`You added a new anecdote: '${anecdoteData}'`))
        setTimeout(() => dispatch(customizedNotification(null)), 5000)
        event.target.anecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNewAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit' >create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm