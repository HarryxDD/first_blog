import React from 'react';

import './Header.css';

const header = () => {
  return (
    <div className='app__header'>
        <div className='app__header-titles'>
          <span className='title__sub'>Hi! I'm</span>
          <span className='title'>Harry</span>
          <span className='title__sub-2'>Welcome to the blog that I created for Backend learning xD.  I'm not gonna use any frontend code in this project so if it's too bad please forgive me :(</span>
        </div>
        <div className='app__header-img'>
          <img src="https://wallpaperaccess.com/full/1261698.jpg" alt="header img" />
        </div>
    </div>
  )
}

export default header
