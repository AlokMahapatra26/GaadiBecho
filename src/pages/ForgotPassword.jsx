import React from 'react'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword() {


   //useNavigate
   const navigate = useNavigate();

   //creating state
 
   const [formData , setFormData] = useState({
     email : "",
   })
 
   const {email} = formData;
 
   const onChange = (e) => {
     setFormData((prevState)=>({
       ...prevState,
       [e.target.id] : e.target.value,
     }))
   }

   //FIREBASE CODE FOR FORGET PASSWORD
   async function onSubmit(e){
    e.preventDefault();
    try{
      const auth = getAuth();
      await sendPasswordResetEmail(auth , email);
      alert("Check your Email for rest password");
    }catch(error){
      alert("Something went wrong")
    }
   }

  return (
    <>
    <section className='flex-1 h-[calc(100vh-3rem)]  flex justify-center items-center ' >

<form className='bg-white flex flex-col items-center justify-center  p-4 border-black border' onSubmit={onSubmit}>
 <h1 className='text-2xl m-2'>Forgot Password</h1>

 

 <input type="text" placeholder='email' id='email' value={email} className='p-2 my-4 border border-black outline-none' onChange={onChange}/>



 
 <button className='my-2 bg-black  transition w-full p-2  text-white '>Send Reset Link</button>
 {/* <OAuth/> */}

</form>

 </section>
    </>
  )
}
