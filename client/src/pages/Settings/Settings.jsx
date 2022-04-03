import React, { useContext, useState } from 'react'
import { Sidebar } from '../../components'

import { BiUser } from 'react-icons/bi'
import './Settings.css'
import { Context } from '../../context/Context'
import axios from 'axios'

const Settings = () => {

  const [file, setFile] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState(false)

  const {user, dispatch} = useContext(Context)
  const PF = "http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const updatedUser = {
        userId: user._id,
        username,
        email,
        password
    };

    if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePic = filename;

        try {
            await axios.post("/upload", data);
        } catch (err) {
            
        }
    }
    try {
        const res = await axios.put("/users/" + user._id, updatedUser);
        setSuccess(true)
        dispatch({type: "UPDATE_SUCCESS", payload: res.data})
    } catch (err) {
        dispatch({type: "UPDATE_FAILURE"})
    }
} 

  return (
    <div className='app__settings'>
        <div className='app__settings-wrapper'>
          <div className='settings__title'>
            <span className='title__update'>Update Your Account</span>
            <span className='title__delete'>Delete Your Account</span>
          </div>
          <form action="" className='settings__form' onSubmit={handleSubmit}>
            <label htmlFor="">Profile Picture</label>
            <div className='profile__settings'>
              <img 
                src={file ? URL.createObjectURL(file) : PF + user.profilePic} 
                alt="profile_pic" 
              />
              <label htmlFor="input__file">
                <BiUser />
              </label>
              <input 
                type="file" 
                id='input__file' 
                style={{ display:'none' }} 
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label htmlFor="">Username</label>
            <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="">Email</label>
            <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="">Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="settings__submit" type='submit'>Update</button>
            {success && (
              <span style={{color: 'green', textAlign: "center", margin: '20px'}}>Updated Successfully!</span>
            )}
          </form>
        </div>
        <Sidebar />
    </div>
  )
}

export default Settings