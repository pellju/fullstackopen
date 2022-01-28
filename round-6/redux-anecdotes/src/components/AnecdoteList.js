import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increaseVotes } from '../reducers/anecdoteReducer'
import { customizedNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filterValue)
    
    const filteredAnecdotes = anecdotes.filter(a => a.content.includes(filter.value))
    //console.log(filteredAnecdotes)
    const dispatch = useDispatch()
  
    const vote = (id, content) => {
      dispatch(customizedNotification(`You voted for '${content}'`))
      dispatch(increaseVotes(id))
      setTimeout(() => dispatch(customizedNotification(null)), 5000)
    }

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList