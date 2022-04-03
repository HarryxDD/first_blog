import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './Sidebar.css'

const Sidebar = () => {
    const [cat, setCat] = useState([])

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories");
            setCat(res.data);
        }

        getCats()
    })

  return (
    <div className='app__sidebar'>
        <div className="app__sidebar-item">
            <div className='app__sidebar-item'>
                <span className='sidebar__title'>ABOUT ME</span>
                <img src="https://i.pinimg.com/236x/8d/84/f7/8d84f7c50943d56db0275971f5c139e8.jpg" alt="aboutme" />
                <p>I'm Truong Ha Vu. I am a studious and team player Computer Science and Engineering
                    sophomore at VNUK Institute for
                    Research and Executive Education.
                    With more than 3 months of experience
                    in web development, I am now seeking
                    an internship or entry-level position to
                    gain experience in the IT field while
                    committing myself towards the
                    company's success
                </p>
            </div>
            <div className='app__sidebar-item'>
                <span className='sidebar__title'>CATEGORIES</span>
                <ul className='sidebar__list'>
                    {cat.map((cate) => (
                        <Link to={`/?cat=${cate.name}`}>
                            <li className='list__item'>{cate.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar