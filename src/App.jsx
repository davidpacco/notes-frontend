import { useState, useEffect } from "react"
import { Note } from "./components/Note"
import { Notification } from "./components/Notification"
import { Footer } from "./components/Footer"
import noteService from './services/notes'
import './index.css'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes))
  }, [])

  const addNote = e => {
    e.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

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
        // alert(`The note ${note.content} was already deleted from server`)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const handleNoteChange = (e) => setNewNote(e.target.value)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange} type="text"
        />
        <button>Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
