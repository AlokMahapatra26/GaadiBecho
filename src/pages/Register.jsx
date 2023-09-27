import React from 'react'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { db } from '../firebase';
import {createUserWithEmailAndPassword, getAuth , updateProfile } from "firebase/auth"
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import OAuth from '../components/OAuth';

export default function Register() {


   //useNavigate
   const navigate = useNavigate();

   //creating state
 
   const [formData , setFormData] = useState({
     email : "",
     password : "",
     name : ""
   })
 
   const {email , password , name} = formData;
 
   const onChange = (e) => {
     setFormData((prevState)=>({
       ...prevState,
       [e.target.id] : e.target.value,
     }))
   }


   //firebase code
   async function onSubmit(e){
      e.preventDefault();

      try{
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth , email , password);

        updateProfile(auth.currentUser , {
          displayName : name,
        })

        const user = userCredential.user;
        const formDataCopy = {...formData}
        delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();

        await setDoc(doc(db , "users" , user.uid) , formDataCopy);
        navigate("/login");
        alert("Login Successfully")


      }catch(error){
        alert(error)
      }
   }

  return (
    <>
     <section className='flex-1 h-[calc(100vh-3rem)]  flex justify-center items-center ' >

<form className='bg-white flex flex-col items-center justify-center  p-4 border-black border' onSubmit={onSubmit}>
 <h1 className='text-2xl m-2'>Register</h1>

 <input type="text" placeholder='name' id='name' value={name} className='p-2 my-4 border border-black outline-none' onChange={onChange}/>

 <input type="text" placeholder='email' id='email' value={email} className='p-2 my-4 border border-black outline-none' onChange={onChange}/>

 <input type="password" placeholder='password'id='password' value={password} className='p-2 my-4 border border-black outline-none' onChange={onChange}/>

 <div className='flex  w-full justify-between  my-2'>
   <p className='text-red-500 cursor-pointer underline' onClick={()=>{
     navigate("/forgot-password")
   }}>Forgot password</p>
   <p className='cursor-pointer underline' onClick={()=>{
     navigate('/login')
   }}>Login</p>
 </div>
 <button className='my-2 bg-black  transition w-full p-2  text-white ' type='submit'>Register</button>
 <OAuth/>

</form>

 </section>
    </>
  )
}
