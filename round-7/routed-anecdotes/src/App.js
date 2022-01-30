import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from "react-router-dom"
import { useField } from './hooks'

const Menu = ({anecdotes, addnew, setNotification, notification}) => {
  const padding = {
    paddingRight: 5
  }
  /*return (
    <div>
      <a href='#' style={padding}>anecdotes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a>
    </div>
  )*/
  return (
    <Router>
      <div>
        <Link style={padding} to="/anecdotes">Anecdotes</Link>
        <Link style={padding} to="/create">Create New</Link>
        <Link style={padding} to="/about">About</Link>
      </div>

      <Switch>
        <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/anecdotes">
            <AnecdoteList anecdotes={anecdotes} notification={notification}/>
        </Route>
        <Route path="/create">
            <CreateNew addNew={addnew} setNotification={setNotification}/>
        </Route>
        <Route path="/about">
            <About />
        </Route>
        
      </Switch>
    </Router>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === id)
  if (anecdote === null || anecdote === undefined){
    return (
      <div></div>
    )
  } else {
    return (
      <div>
        <h2>{anecdote.content}</h2>
        <p></p>
        has {anecdote.votes} votes.
        <p></p>
        For more information, please see <Link to={`${anecdote.info}`}>{anecdote.info}</Link>
        <p></p>
      </div>
    )
  }
}

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <h2>Anecdotes</h2>
    {notification}
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  /*const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')*/
  const history = useHistory()

  const contentField = useField('content')
  const authorField = useField('author')
  const urlField = useField('url')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      /*content,
      author,
      info,*/
      content: contentField.value,
      author: authorField.value,
      url: urlField.value,
      votes: 0
    })
    history.push('/anecdotes')
    props.setNotification(`Added a new anecdote: ${contentField.value} by ${authorField.value}`)
    setTimeout(() => {
      props.setNotification(null)
    }, 10000)
  }

  const handleReset = (e) => {
    e.preventDefault()
    contentField.resetValue()
    authorField.resetValue()
    urlField.resetValue()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' type={contentField.type} value={contentField.value} onChange={contentField.onChange} />
        </div>
        <div>
          author
          <input name='author' type={authorField.type} value={authorField.value} onChange={authorField.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' type={urlField.type} value={urlField.value} onChange={urlField.onChange} />
        </div>
        <button type="submit">create</button>
      </form><button onClick={handleReset}>reset</button>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addnew={addNew} setNotification={setNotification} notification={notification}/>
      <Footer />
    </div>
  )
}

export default App;