import React from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router';
import { useEffect , useState } from 'react';

export default function Profile() {

  const auth = getAuth();
  const navigate = useNavigate();

  //State
  const [data , setData] = useState({
    name : auth.currentUser.displayName,
    email : auth.currentUser.email
  })

  const {name , email} = data;

  

  //LOGOUT FUNCTION
  function onLogout(){
    auth.signOut();
    navigate("/login")
  }



  return (
    <>
    <section className=''>
      <div className='  flex flex-col justify-center items-center p-4'>
      <p className='text-md mt-4'><span>Name : </span>{name}</p>
      <p className='text-md mt-2'><span>Email : </span>{email}</p>
      
      <button className="p-2 border border-black mt-4" onClick={()=>{navigate("/create-listing")}}>Sell Your Vehicle</button>
      <button onClick={onLogout} className='  p-2  border border-black hover:bg-black hover:text-white transition m-x-auto mt-4'>Logout</button>
      </div>
      
      <dir className="bg-red-900 w-full">
          <div >1</div>
          <div>2</div>
          <div>3</div>
      </dir>
    </section>
    
    </>

  )
}
