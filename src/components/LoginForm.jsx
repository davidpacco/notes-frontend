import { useState } from 'react'
import PropTypes from 'prop-types'

export function LoginForm({
  handleSubmit
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const handleLogin = async e => {
    e.preventDefault()

    await handleSubmit({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </div>

      <button type="submit">login</button>

    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}