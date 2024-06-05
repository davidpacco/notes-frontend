export function LoginForm({
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  handleSubmit
}) {
  return (
    <form onSubmit={handleSubmit}>
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