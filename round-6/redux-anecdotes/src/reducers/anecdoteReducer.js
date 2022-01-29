export const increaseVotes = (id) => {
  return {
    type: 'TOGGLE_VOTE',
    data: { id }
  }
}

export const newAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_VOTE':
      const id = action.data.id
      const anecdote = state.find(n => n.id === id)
      const newAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(existingAnecdote => 
        existingAnecdote.id !== id ? existingAnecdote : newAnecdote
      ).sort(function(x,y){return y.votes-x.votes})
      case 'NEW_ANECDOTE':
        return [...state, action.data]
      case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}

export default reducer