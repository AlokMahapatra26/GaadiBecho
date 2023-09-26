import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';

export default function Login() {

  //useNavigate
  const navigate = useNavigate();

  //creating state

  const [formData , setFormData] = useState({
    email : "",
    password : ""
  })

  const {email , password} = formData;

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value,
    }))
  }

  return (
    
    <>
    <section className='flex-1 h-[calc(100vh-3rem)]  flex justify-center items-center ' >

<form className='bg-white flex flex-col items-center justify-center  p-4 border-black border'>
 <h1 className='text-2xl m-2'>Login</h1>

 <input type="text" placeholder='email' id='email' value={email} className='p-2 my-4 border border-black outline-none' onChange={onChange}/>

 <input type="password" placeholder='password'id='password' value={password} className='p-2 my-4 border border-black' onChange={onChange}/>

 <div className='flex  w-full justify-between  my-2'>
   <p className='text-red-500 cursor-pointer underline' onClick={()=>{
     navigate("/forgot-password")
   }}>Forgot password</p>
   <p className='cursor-pointer underline' onClick={()=>{
     navigate('/register')
   }}>Register</p>
 </div>
 <button className='my-2 bg-black  transition w-full p-2  text-white '>Login</button>
 {/* <OAuth/> */}

</form>

 </section>
    </>
  )
}
