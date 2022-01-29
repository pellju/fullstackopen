import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { customizedNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {


    const createNewAnecdote = async (event) => {
        event.preventDefault()
        const anecdoteData = event.target.anecdote.value
        const addAnecdote = await anecdoteService.createAnecdote(anecdoteData)
        props.newAnecdote(addAnecdote)
        props.customizedNotification(`You added a new anecdote: '${anecdoteData}'`, 5000)
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

export default connect(
    null, 
    {newAnecdote, customizedNotification}
)(AnecdoteForm)
