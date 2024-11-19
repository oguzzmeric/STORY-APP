import React from 'react'
import { getInitials } from '../../utils/helper'

function ProfileInfo({userInfo,onLogout}) {
  return (
   userInfo &&(

    <div className='flex items-center gap-3 '>


      <div className='flex justify-between p-2' >
        <p className=' text-xl font-medium p-5'>{userInfo.fullName ||""}</p>
        <button className='btn-ups' onClick={onLogout} >LogOut</button>
      </div>
    </div>
   ) 
  )
}

export default ProfileInfo
