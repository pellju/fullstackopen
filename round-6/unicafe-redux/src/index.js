import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistics = ({ store }) => {
  if ((store.getState().good + store.getState().ok + store.getState().bad) > 0) {
    return (
      <div>
        <div>good {store.getState().good}</div>
        <div>ok {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
        <div>all {store.getState().good + store.getState().ok + store.getState().bad}</div>
        <div>average {(store.getState().good - store.getState().bad) / (store.getState().good + store.getState().ok + store.getState().bad)}</div>
        <div>positive {store.getState().good / (store.getState().good + store.getState().ok + store.getState().bad) * 100} %</div>
      </div>
    )
  } else {
    return (
      <div>
        No feedback given.
      </div>
    )
  }
} 

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      < Statistics store={store} /> 
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
