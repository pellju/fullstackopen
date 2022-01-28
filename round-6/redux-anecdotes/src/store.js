import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import reducer from './reducers/anecdoteReducer'
import changeNotification from './reducers/notificationReducer'

const combinedReducer = combineReducers({
    anecdotes: reducer,
    notification: changeNotification
})

const store = createStore(combinedReducer, composeWithDevTools())

export default store