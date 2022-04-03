import React, { useEffect, useState } from 'react';
import { Header, Posts, Sidebar } from '../../components';
import axios from "axios";
import './Home.css'
import { useLocation } from 'react-router-dom';

const Home = () => {

  const [posts, setPosts] = useState([]);
  const {search} = useLocation();

  // Ham` nay` fetch data tu localhost:5000 (tuc la cai BE) sau do dung useState day data vao post roi in ra
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search)
      setPosts(res.data)
    }

    fetchPosts();
  }, [search])

  return (
    <div id='home'>
      <Header />
      <div className='app__homepage'>
        <Posts posts={posts}/>
        <Sidebar />
      </div>
    </div>
  )
}

export default Home