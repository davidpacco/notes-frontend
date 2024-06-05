import { useState, useEffect } from "react"
import { Note } from "./components/Note"
import { Notification } from "./components/Notification"
import { Footer } from "./components/Footer"
import { NoteForm } from "./components/NoteForm"
import { LoginForm } from "./components/LoginForm"
import noteService from './services/notes'
import loginService from "./services/login"
import './index.css'
import { Togglable } from "./components/Togglable"

function App() {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [])

  useEffect(() => {
    const userInLocalStorage = window.localStorage.getItem('loggedNoteappUser')
    if (userInLocalStorage) {
      const user = JSON.parse(userInLocalStorage)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])



  const toggleImportanceOf = id => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(`The note ${note.content} was already deleted from server`)
        setTimeout(() => setErrorMessage(null), 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const addNote = noteObject => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedNoteappUser')
    noteService.setToken(null)
    setUser(null)
  }

  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null && <Togglable buttonLabel='Login'>
        <LoginForm
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleSubmit={handleLogin}
        />
      </Togglable>}

      {
        user !== null &&
        <div>
          <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='New note'>
            <NoteForm
              createNote={addNote}
            />
          </Togglable>
        </div>
      }

      <br />

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>


      <Footer />
    </div>
  )
}

export default App
