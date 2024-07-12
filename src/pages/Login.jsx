import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // Prefill email if passed from register page
  React.useEffect(() => {
    if (location.state && location.state.email) {
      setUserData(prevState => ({ ...prevState, email: location.state.email }))
    }
  }, [location.state])

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!userData.email || !userData.password) {
      setErrorMessage('Please fill in all fields')
      return
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || []
    const user = storedUsers.find(user => user.email === userData.email)
    
    if (user && user.password === userData.password) {
      localStorage.setItem('currentUser', JSON.stringify(user)) // Store the current user in local storage
      navigate('/') // Redirect to the dashboard or any other page
      window.location.reload()
    } else {
      setErrorMessage('Invalid email or password')
    }
  }

  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} className="form login__form">
          {errorMessage && <p className="form__error-message">{errorMessage}</p>}
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} autoFocus />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} />
          <button type='submit' className='btn primary'>Login</button>
        </form>
        <small>Don't have an account? <Link to='/register'>Sign up</Link></small>
      </div>
    </section>
  )
}

export default Login
