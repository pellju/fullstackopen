import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import reducer from './reducers/anecdoteReducer'

const combinedReducer = combineReducers({
    anecdotes: reducer
})

const store = createStore(combinedReducer, composeWithDevTools())

export default store