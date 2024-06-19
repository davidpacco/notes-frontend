export function Note({ note, toggleImportance }) {
  const label = note.important ? 'Make not important' : 'Make important'
  return (
    <li className="note">
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}