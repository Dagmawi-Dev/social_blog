import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = (e) => {
    e.preventDefault();

    const { name, email, password, password2 } = userData;

    if (!name || !email || !password || !password2) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (password !== password2) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const authorID = existingUsers.length + 1; // Generate authorID (example: incrementing length)

    if (existingUsers.some(user => user.email === email)) {
      setErrorMessage('User already exists');
      return;
    }
    
    const newUser = { authorID, name, email, password }; // Include authorID in the user object
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    navigate('/login', { state: { email } }); // Redirect to login and prefill email
  };

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form onSubmit={registerUser} className="form register__form">
          {errorMessage && <p className="form__error-message">{errorMessage}</p>}
          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler} />
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler} />
          <input type="password" placeholder='Confirm Password' name='password2' value={userData.password2} onChange={changeInputHandler} />
          <button type='submit' className='btn primary'>Register</button>
        </form>
        <small>Already have an account? <Link to='/login'>Sign in</Link></small>
      </div>
    </section>
  );
};

export default Register;
