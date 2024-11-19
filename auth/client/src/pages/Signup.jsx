import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom';
import OAuth from '../compnent/OAuth';

const Signup = () => {
  const [formData,setformData] = useState({});
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();



  const handleChange = (e) =>{
    setformData({...formData,[e.target.id]: e.target.value})
  };
  console.log(formData);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    

    try {
      setLoading(true);
      setError(false);
      const res = await fetch('api/auth/signup',{
        method : 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body : JSON.stringify(formData),
      });//url'in baş kısmı vite.config dosyasında

      const data = await res.json();
      setLoading(false);
      if(data.success ===false){
        setError(true);
        return;
      }
      setError(false);
      navigate('/sign-in')
    }catch(error) {
      setLoading(false);
      setError(true);
      navigate('/sign-in')
      
    }};


  return (
    <div className='p-3 max-w-lg mx-auto'  >
      <h1 className='text-3xl text-center font-semibold my-7'>sign up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
      <input className='bg-slate-100 p-3 rounded-lg' type='text' placeholder='Username' id='username' onChange={handleChange} />
      <input className='bg-slate-100 p-3 rounded-lg' type='email' placeholder='Email' id='email' onChange={handleChange} />
      <input className='bg-slate-100 p-3 rounded-lg' type='password' placeholder='Password' id='password' onChange={handleChange} />
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'  >{loading ? 'Loading...':'Sign Up'}</button>
      <OAuth/>
      </form>
      <div className='flex gap-2 mt-5' >
        <p>Have an account</p>
        <Link to={'/sign-in'} >
        <span className='text-blue-500' >Sign In</span>
        </Link>
      </div>
      <p  className='text-red-800 mt-5 '>{error && 'error happend'}</p>
    </div>
  )
}


export default Signup