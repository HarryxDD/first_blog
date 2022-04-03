import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Register.css'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault(); // khong refresh page moi~ khi submit
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      res.data && window.location.replace("/login");

    } catch (error) {
      setError(true);    
    }
  }

  return (
    <div className='app__register'>
        <span className='app__register-title'>Register</span>
        <form action="" className='register__form' onSubmit={handleSubmit}>

          <label htmlFor="">Username</label>
          <input 
            type="text" 
            placeholder='Enter your username...' 
            onChange={e => setUsername(e.target.value)}
          />

          <label htmlFor="">Email</label>
          <input 
            type="text" 
            placeholder='Enter your email...' 
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="">Password</label>
          <input 
            type="password" 
            placeholder='Enter your password...' 
            onChange={e => setPassword(e.target.value)}
          />

          <button className='register__button' type='submit'>Register</button>
        </form>
        <button className='register__login__button'>
          <Link to='/login'>Login</Link>
        </button>

        {error && (
          
          <span>Wrong Credentials!</span>
        )}
    </div>
  )
}

export default Register