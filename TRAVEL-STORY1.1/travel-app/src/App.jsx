import React from 'react'
import {BrowserRouter as Router,Routes, Route, Navigate} from "react-router-dom";

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './Home/Home';  
import Line from './pages/Line';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<Root/>} />
          <Route path='/dashboard' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/line' element={<Line/>} />
        </Routes>
      </Router>
    </div>
  )
}

const Root = () =>{
  const isAuthanticated = !!localStorage.getItem("token");
  return isAuthanticated ? 
  (<Navigate to="/dashboard" />)
  : 
  (<Navigate to="/login" />)
};


export default App