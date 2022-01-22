import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const createNewAnecdote = (event) => {
        event.preventDefault()
        const anecdoteData = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(anecdoteData))
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