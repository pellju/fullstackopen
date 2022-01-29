import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import reducer from './reducers/anecdoteReducer'
import changeNotification from './reducers/notificationReducer'
import changeFilterValue from './reducers/filterReducer'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const combinedReducer = combineReducers({
    anecdotes: reducer,
    notification: changeNotification,
    filterValue: changeFilterValue,
})

const store = createStore(combinedReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store