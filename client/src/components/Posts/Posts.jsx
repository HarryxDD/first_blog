import React from 'react'
import Post from '../Post/Post'
import './Posts.css'

const Posts = ({posts}) => {
  return (
    <div className='app__posts'>
        {posts.map(p => (
          <Post post={p}/>
        ))}
    </div>
  )
}

export default Posts