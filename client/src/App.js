import React, { useContext } from 'react';
import { Topbar } from './components';
import { Home, Single, Write, Settings, Login, Register } from './pages';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import './App.css'
import { Context } from './context/Context';


const App = () => {

  const {user} = useContext(Context);

  return (
    <Router>
        <Topbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={user ? <Home /> : <Register />} />
          <Route path='/write' element={user ? <Write /> : <Register />} />
          <Route path='/login' element={user ? <Home /> : <Login />} />
          <Route path='/settings' element={user ? <Settings /> : <Register />} />
          <Route path='/post/:postId' element={<Single />} />
        </Routes>
    </Router>
  )
}

export default App