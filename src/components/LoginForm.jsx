export function LoginForm({ username, setUsername, password, setPassword, handleLogin }) {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">login</button>

    </form>
  )
}