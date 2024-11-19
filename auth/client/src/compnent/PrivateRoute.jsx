import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'

function PrivateRoute() {
  const {currentUser} = useSelector(state => state.user)

  return currentUser ? <Outlet/> : <Navigate to='/profile' />


}

export default PrivateRoute