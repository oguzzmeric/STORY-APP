import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import PasswordInput from '../../components/input/PasswordInput'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';


const Signup = () => {
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[password , setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup  = async (e)=>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email");
      return;
    }
    if(!name){
      setError("Please enter a name");
      return;
    }
    

    if(!password){
      setError("please enter the password")
      return;
    }
    setError("");

    //Signup api call
    try{
      const response = await axiosInstance.post("/create-account",{
        fullName:name,
        email:email,
        password:password,
      });
      console.log(response);

      if (response.data && response.data.accessToken ){
        localStorage.setItem("token",response.data.accesToken);
        alert("succesful register");
        navigate("/dashboard");
      }
    }catch(error){
      //handle error
      if(error.response&&
        error.response.data &&
        error.response.data.message
      ){
        setError(error.response.data.message)
      }else{
        setError("An unexpecting error happend")
      }
    }

  };



  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>


      <div className='login-ui-box right-10 -top-40'/>
      <div className='login-ui-box bg-cyan-500 -bottom-40 right-1/2 ' />
      <div className='login-ui-box left-20 top-1 ' />


      <div className='container h-screen flex items-center justify-center px-20 mx-auto' >
        <div className='w-2/4 h-[90vh] items-end bg-signup-bg-img bg-cover bg-center rounded-lg p-10 z-50'> 
          <div>
            <h4 className='text-5xl text-secondary font-semibold leading-[58px]'>
              Join the <br /> Adventure
            </h4>
            <p className='text-[15px] text-secondary leading-6 pr-7 mt-7' >
              Record your Travel Experiance and memories in your personal travel journey 
            </p>
          </div>

        </div>
        

        <div className='w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-cyan-200/20'>
          <form onSubmit={handleSignup}>
            <h4 className='text-2xl font-semibold mb-7' >Signup</h4>
            
            
            <input 
            type="text" 
            placeholder='email' 
            className='input-box' 
            value={email}
            onChange={({target}) => {
                setEmail(target.value)
              }}
            />
            <input 
            type="text" 
            placeholder='name' 
            className='input-box' 
            value={name}
            onChange={({target}) => {
                setName(target.value)
              }}
            />
            <PasswordInput
            value={password}
            onChange={({target})=>{
              setPassword(target.value)
            }}
            />

            {error && <p className='text-red-600 text-xs pb-1 ' >{error}</p>}

            <button type="submit" className="btn-primary" >
              Create Account
            </button>
            <p className='text-xs text-slate-500 text-center my-4 '>OR</p>
            
            <button type="submit" 
            className='btn-primary btn-light' 
            onClick={()=>{
              navigate('/login')
            }} >
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup 