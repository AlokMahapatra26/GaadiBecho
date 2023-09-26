import React from 'react'
import { GiCarWheel } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();

  return (
    <>
    <header className="text-gray-600 body-font border border-black">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
  <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0 cursor-pointer" onClick={()=>{navigate("/")}}>
            <GiCarWheel className='text-4xl'/>
      <span className="ml-3 text-xl">GaadiBecho</span>
    </a>
    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto ">
      <a className="mr-5 hover:text-gray-900 cursor-pointer" onClick={()=>{navigate("/")}}>Home</a>
      <a className="mr-5 hover:text-gray-900 cursor-pointer" onClick={()=>{navigate("/offer")}}>Offers</a>
      <a className="mr-5 hover:text-gray-900 cursor-pointer" onClick={()=>{
        navigate("/login")
      }}>Login</a>
      
    </nav>
 
    
  </div>
</header>
    </>
  )
}
