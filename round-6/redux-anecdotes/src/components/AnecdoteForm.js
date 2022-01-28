import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { customizedNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNewAnecdote = (event) => {
        event.preventDefault()
        const anecdoteData = event.target.anecdote.value
        dispatch(newAnecdote(anecdoteData))
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