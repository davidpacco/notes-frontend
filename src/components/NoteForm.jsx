import { useState } from 'react'

export function NoteForm({ createNote }) {
  const [newNote, setNewNote] = useState('')

  const addNote = e => {
    e.preventDefault()

    createNote({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }

  const handleNoteChange = (e) => setNewNote(e.target.value)

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          type="text"
          placeholder='Write note content here'
          data-testid='note-input'
        />
        <button>Save</button>
      </form>
    </div>
  )
}