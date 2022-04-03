import React, { useEffect, useState, useContext } from 'react'

import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import axios from 'axios';
import './SinglePost.css'

const SinglePost = () => {

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {data: {username: user.username}} ) // hoi kho hieu cho~ data:
            window.location.replace("/");
        } catch (err) {
                
        }
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title, 
                desc
            })
            // window.location.reload();
            setUpdateMode(false)
        } catch (err) {
                
        }
    }
    
    return (
        <div className='app__singlepost'>
        <div className="app__singlepost-wrapper">
            {post.photo && (
                <img 
                src={PF + post.photo} 
                    className='app__singlepost-wrapper_img' 
                    alt="single post img" 
                    />
            )}

            {
                updateMode 
                ? <input type="text" value={title} className="singlepost__title-input" onChange={(e) => setTitle(e.target.value)}/> 
                : (
                    <div className='singlepost'>
                        <h1 className='singlepost__title'>
                            {title}
                        </h1>
                        {post.username === user?.username && (
                            <div className='singlepost__edit'>
                                <AiOutlineEdit onClick={() => setUpdateMode(true)}/>
                                <AiOutlineDelete onClick={handleDelete}/>
                            </div>
                        )}
                        
                    </div>
                )
            }
            <div className='singlepost__info'>
                <span className='singlepost__author'>
                    Author: 
                    <Link to={`/?user=${post.username}`}>
                        <b>{post.username}</b>
                    </Link>
                </span>
                <span className='singlepost__date'>{new Date(post.createdAt).toDateString()}</span>
            </div>

            {updateMode 
                ? <textarea  value={desc} className="singlepost__desc-input" onChange={(e) => setDesc(e.target.value)}/> 
                : (
                    <p className='singlepost__desc'>
                        {desc}
                    </p>
                )
            }
            {updateMode && (
                <button className='singlepost__desc-button' onClick={handleUpdate}>Update</button>
            )}
        </div>
    </div>
  )
}

export default SinglePost