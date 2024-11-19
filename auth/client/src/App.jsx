import React from 'react'
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Header from './compnent/Header'
import PrivateRoute from './compnent/PrivateRoute';

const App = () => {
  return (  
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-in' element={<Signin/>} />
      <Route path='/sign-up' element={<Signup/>} />
      <Route element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile/>} />
      </Route>
      
      

    </Routes>
    </BrowserRouter>
  )
}

export default App