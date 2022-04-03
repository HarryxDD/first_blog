import React, {useContext, useState} from 'react'

import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import "./Topbar.css"

const TopBar = () => {

  const [menu, setMenu] = useState(false);
  const {user, dispatch} = useContext(Context);

  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({type: "LOGOUT"});
  }

  return (
    <nav className='app__navbar'>
        <div className='app__navbar-social'>
            <FiFacebook />
            <FiInstagram />
            <FiTwitter />
        </div>
        <ul className='app__navbar-links'>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
            <li>
              <Link to="/contact">CONTACT</Link>
            </li>
            <li>
              <Link to="/write">CREATE</Link>
            </li>
            <li onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
        </ul>
        <div className='app__navbar-avatar'>
          {user ? (
            <Link to="/settings">
              <img src={PF + user.profilePic} alt="avatar" />
            </Link>
          ) : (
            <ul className='app__links-nouser'>
              <li><Link className='link' to="/login">LOGIN</Link></li>
              <li>|</li>
              <li><Link className='link' to="/register">REGISTER</Link></li>
            </ul>
            
            
          )}
        </div>
        <div className='app__navbar-smallscreens'>
          <GiHamburgerMenu color='black' fontSize={30} onClick={() => setMenu(true)}/>
          {menu && (
            <div className='app__navbar-smallscreens_overlay'>
              <MdClose fontSize={45} color='white' className="overlay__close" onClick={() => setMenu(false)}/>
              <ul className='app__navbar-smallscreens_links'>
                <li><a href="#home" onClick={() => setMenu(false)}>Home</a></li>
                <li><a href="#about" onClick={() => setMenu(false)}>About</a></li>
                <li><a href="#contact" onClick={() => setMenu(false)}>Contact</a></li>
                <li><a href="#write" onClick={() => setMenu(false)}>Create</a></li>
                <li><a href="#logout" onClick={() => setMenu(false)}>Logout</a></li>
              </ul>
            </div>
          )}

        </div>
    </nav>
  )
}

export default TopBar