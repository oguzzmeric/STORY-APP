import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom';
import { Signinstart , Signinsucces , Signinfailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../compnent/OAuth';


const Signin = () => {
  const [formData,setformData] = useState({});
  const {loading,error} = useSelector((state)=>state.user) 
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) =>{
    setformData({...formData,[e.target.id]: e.target.value})
  };
  console.log(formData);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    

    try {
      dispatch(Signinstart());

      const res = await fetch('api/auth/signin',{
        method : 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body : JSON.stringify(formData),
      });//url'in baş kısmı vite.config dosyasında

      const data = await res.json();
      if(data.succes ===false){
        dispatch(Signinfailure(data.message));
        console.log(error);
        
        return;
      }
      dispatch(Signinsucces(data)); 
      navigate('/')
    }catch(error) {
      dispatch(Signinfailure(error ))
    }};



  return (
    <div className='p-3 max-w-lg mx-auto'  >
      <h1 className='text-3xl text-center font-semibold my-7'>sign in</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
      <input className='bg-slate-100 p-3 rounded-lg' type='email' placeholder='Email' id='email' onChange={handleChange} />
      <input className='bg-slate-100 p-3 rounded-lg' type='password' placeholder='Password' id='password' onChange={handleChange} />
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'  >{loading ? 'Loading...':'Sign In'}</button>
      <OAuth />
      </form>
      <div className='flex gap-2 mt-5' >
        <p>already Have an account</p>
        <Link to={'/sign-up'} >
        <span className='text-blue-500' >Sign Up</span>
        </Link>
      </div>
      <p  className='text-red-800 mt-5 '>{error ? error || 'somethink went wrong' : ''}</p>
    </div>
  )
}


export default Signin