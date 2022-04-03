import React from 'react';
import { Sidebar, SinglePost } from '../../components';

import './Single.css';

const Single = () => {
  return (
    <div className='app__single'>
      <SinglePost />
      <Sidebar />
    </div>
  )
}

export default Single