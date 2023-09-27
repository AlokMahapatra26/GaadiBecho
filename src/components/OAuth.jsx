import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import { GoogleAuthProvider  , getAuth, signInWithPopup} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import { db } from '../firebase';
import { getDoc } from 'firebase/firestore';

export default function OAuth() {

    const navigate = useNavigate();

    async function onGoogleClick(){
        try{
            const auth = getAuth();
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth , provider);
            const user = result.user;

            //check for user
            const docRef = doc(db , "users" , user.uid)
            const docSnap = await getDoc(docRef)

            if(!docSnap.exists()){
                await setDoc(docRef , {
                    name : user.displayName,
                    email : user.email,
                    timestamp : serverTimestamp(),
                })
            }
            navigate('/profile');
            alert("Logged in Successfully")
        }catch(error){
            console.log(error)
        }
    }


  return (
    <button type="button" onClick={onGoogleClick} className='bg-black text-white w-full p-2'>Continue with <FcGoogle className='ml-2 inline text-2xl'/></button>
  )
}
