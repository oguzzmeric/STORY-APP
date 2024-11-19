import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'


const BackButton = ({destination = '/'}) => {
  return (
    <div className='flex' >
        <Link to={destination} > 
        <BsArrowLeft/>
        </Link>
    </div>
  )
}

export default BackButton