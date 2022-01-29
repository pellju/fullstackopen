import anecdoteService from '../services/anecdotes'

export const increaseVotes = (id) => {
  return async dispatch => {
    await anecdoteService.increaseVote(id)
    dispatch({
      type: 'TOGGLE_VOTE',
      data: { id }
    })
  }
  
  /*return {
    type: 'TOGGLE_VOTE',
    data: { id }
  }*/
}

export const newAnecdote = (anecdote) => {
  return dispatch => {
    //const newAnecdote = await anecdoteService.createAnecdote(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
  /*return {
    type: 'NEW_ANECDOTE',
    data: anecdote
  }*/
}

export const initializeAnecdotes = (anecdotes) => {
  /*return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }*/
  return async dispatch => {
    dispatch({
      type: 'INIT_ANECDOTES',
      data: await anecdoteService.getAll()
    })
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
      )
      case 'NEW_ANECDOTE':
        return [...state, action.data]
      case 'INIT_ANECDOTES':
        return action.data
    default:
      return state
  }
}

export default reducer