import React from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router';

export default function Profile() {

  const auth = getAuth();
  const navigate = useNavigate();

  //LOGOUT FUNCTION
  function onLogout(){
    auth.signOut();
    navigate("/login")
  }

  return (
    <>
    <button onClick={onLogout}>Logout</button>
    </>

  )
}
