export function NoteForm({ addNote, newNote, handleNoteChange }) {
  return (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange} type="text"
      />
      <button>Save</button>
    </form>
  )
}