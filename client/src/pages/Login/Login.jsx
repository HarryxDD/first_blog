import axios from 'axios'
import React, { useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

import './Login.css'

const Login = () => {

  const userRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })


    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" })
    }
  }

  return (
    <div className='app__login'>
        <span className='app__login-title'>Login</span>
        <form action="" className='login__form' onSubmit={handleSubmit}>

            <label htmlFor="">Username</label>
            <input 
              type="text" 
              placeholder='Enter your username...' 
              ref={userRef}
            />

            <label htmlFor="">Password</label>
            <input 
              type="password" 
              placeholder='Enter your password...' 
              ref={passwordRef}
            />

            <button className='login__button' type='submit'>Login</button>
        </form>
        <button className='login__register__button' disabled={isFetching}>
          <Link to='/register'>Register</Link>
        </button>
    </div>
  )
}

export default Login