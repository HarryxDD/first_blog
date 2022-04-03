import React from 'react'
import { Link } from 'react-router-dom'

import './Post.css'

const Post = ({post}) => {

  const PF = "http://localhost:5000/images/";

  return (
    <div className='app__post'>
        {post.photo && (
            <img src={PF + post.photo} 
            alt="post pic" 
            />
        )}
        
        <div className='app__post-info'>
            <div className='app__post-cats'>
            {post.categories.map((c) => (
                <span className="post__cat">{c.name}</span>
            ))}
            </div>
            <Link to={`/post/${post._id}`} className="link">
                <span className="post__title">
                    {post.title}
                </span>
            </Link>
            <hr />
            <span className="post__date">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className='post__decs'>
            {post.desc}
        </p>
    </div>
  )
}

export default Post