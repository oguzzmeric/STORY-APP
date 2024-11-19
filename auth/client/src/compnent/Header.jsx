import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const {currentUser} = useSelector(state => state.user);

  return (
    <div className='bg-slate-300' >
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to={'/'} >
        <h1 className='font-bold' >Auth App</h1>
        </Link>
        <ul className='flex gap-4' >
          <Link to={'/'} >
          <li>home</li>
          </Link>
          <Link to={'/about'} >
          <li>about</li>
          </Link>
          <Link to={'/sign-in'} >
          {currentUser ? (
            <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7  rounded-full object-cover' />
          ) : ( 
            <li> sign in amcık </li>
          )}
          
          </Link>

        </ul>
        
      </div>
    </div>
  )
}

export default Header