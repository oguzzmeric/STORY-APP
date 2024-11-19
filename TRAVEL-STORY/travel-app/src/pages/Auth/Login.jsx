import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import PasswordInput from '../../components/input/PasswordInput'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';


const Login = () => {
  const[email,setEmail] = useState("");
  const[password , setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin  = async (e)=>{
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter a valid email");
      return;
    }

    if(!password){
      setError("please enter the password")
      return;
    }
    setError("");
    
    //Login api call
    try{
      const response = await axiosInstance.post("/login",{
        email:email,
        password:password,
      });

      if(response.data && response.data.accessToken ){
        localStorage.setItem("token",response.data.accessToken);
        navigate("/dashboard");
        console.log(response.data.accessToken)
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
    <div className='h-screen bg-cyan-250 overflow-hidden relative'>


      <div className='login-ui-box right-10 -top-40'/>
      <div className='login-ui-box bg-cyan-500 -bottom-40 right-1/2 ' />
      <div className='login-ui-box left-20 top-1 ' />


      <div className='container h-screen flex items-center justify-center px-20 mx-auto' >
        <div className='w-2/4 h-[90vh] items-end bg-login-bg-img bg-cover bg-center rounded-lg p-10 z-50'> 
          <div>
            <h4 className='text-5xl text-amber-900 font-semibold leading-[58px]'>
              Capture your <br /> Journey 
            </h4>
            <p className='text-[15px] text-amber-900 leading-6 pr-7 mt-7' >
              Record your Travel Experiance and memories
            </p>
          </div>

        </div>
        

        <div className='w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-cyan-200/20'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl font-semibold mb-7' >Login</h4>
            
            
            <input 
            type="text" 
            placeholder='email' 
            className='input-box' 
            value={email}
            onChange={({target}) => {
                setEmail(target.value)
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
              LOGİN
            </button>
            <p className='text-xs text-slate-500 text-center my-4 '>OR</p>
            <button type="submit" 
            className='btn-primary btn-light ' 
            onClick={()=>{
              navigate('/signup')
            }} >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login 