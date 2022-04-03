import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Context } from '../../context/Context';

import './Write.css';

const Write = () => {

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const {user} = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;

            try {
                await axios.post("/upload", data);
            } catch (err) {
                
            }
        }
        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/"+res.data._id);
        } catch (err) {
            
        }
    } 

  return (
    <div className='app__write'>
        {file && (
            <img   
            src={URL.createObjectURL(file)} 
            className='input__img'
                alt="input pic" 
                />
        )}
        <form className='app__write-form' onSubmit={handleSubmit}>
            <div className='form__group'>
                <label htmlFor="input__file">
                    <AiOutlinePlus />
                </label>
                <input 
                    type="file" 
                    id='input__file' 
                    style={{display: 'none'}}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <input 
                    type="text" 
                    placeholder='Title' 
                    id='file__input' 
                    className='input__form input__title' 
                    autoFocus={true} 
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className='form__group'>
                <textarea 
                    placeholder='Tell your story...' 
                    type='text'
                    className='input__form input__para'
                    onChange={(e) => setDesc(e.target.value)}
                ></textarea>
            </div>
            <button className="input__submit" type='submit'>Publish</button>
        </form>
    </div>
  )
}

export default Write