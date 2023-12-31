import React from 'react'
import { useState } from 'react'
import {getStorage , ref , uploadBytesResumable , getDownloadURL} from "firebase/storage"
import { addDoc, collection , serverTimestamp } from 'firebase/firestore';
import {getAuth} from "firebase/auth";
import {db} from "../firebase";
import {useNavigate} from "react-router";


export default function CreateListing() {

  const auth = getAuth();
 const  navigate = useNavigate();

   //USE STATE
   const [formData , setFormData]  = useState({
    type : 'sell',
    title : '',
    description : '',
    offer : false,
    actualPrice : '',
    discountedPrice : '',
    totalAmount : '',
    images : {},
    email : '',
    phone :''
  });

  //DESTRUCTURING
  const {type , title , description , offer , actualPrice , discountedPrice , totalAmount ,  images , email , phone} = formData;

  //ONSUBMIT
  function onSubmit(){
    console.log("hello")
  }

    //SOME COMPLEX LOGIC TO TOGGLE STATE
    async function onChange(e){
      let boolean = null;
  
      if(e.target.value === "true"){
        boolean = true;
      }
  
      if(e.target.value === "false"){
        boolean = false;
      }
  
      if(e.target.files){
        setFormData((prevState)=>({
          ...prevState,
          images : e.target.files
        }))
      }
  
      if(!e.target.files){
        setFormData((prevState)=>({
          ...prevState,
          [e.target.id] : boolean ?? e.target.value,
        }))
      }
    }

    //ONSUBMIT FUNCTION
    async function onSubmit(e){
      e.preventDefault();
      console.log(formData)

      if(images.length > 12){
        alert("More than 12 are not allowed")
        return;
      }

      //UPLOADING IMAGES TO FIREBASE

    async function storeImage(image){
      return new Promise((resolve , reject)=>{
        const storage = getStorage()
        const filename = `${auth.currentUser.uid}-${image.name}`;
        const storageRef = ref(storage , filename);
        const uploadTask = uploadBytesResumable(storageRef , image)
        uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    reject(error)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      resolve( downloadURL);
    });
  }
);
      })
    }

    const imgUrls = await Promise.all(
      [...images].map((image)=>storeImage(image))).catch((error)=>{
        
        alert("Images not uploaded")
        return;
      }
    );


    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp : serverTimestamp(),
      userRef : auth.currentUser.uid,
    };
  
     // Remove empty fields
for (const key in formDataCopy) {
  if (formDataCopy[key] === '') {
    delete formDataCopy[key];
  }
}
  
  delete formDataCopy.images;
  !formDataCopy.offer && delete formDataCopy.discountedPrice;
  console.log(formDataCopy)
  const docRef = await addDoc(collection(db , "listings"), formDataCopy);
  alert("Listing created")
  navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

    

    
  

  

  return (
    <main className='max-w-md px-2 mx-auto'>
      <h1 className='text-3xl text-center mt-6 font-bold'>Add Your Vehicle</h1>
      <form className='mt-8' onSubmit={onSubmit}>

        <div className='flex mt-4 '>
          <button type='button' id='type' value="2" onClick={onChange} className={`px-7 py-3 mr-2 font-medium text-sm uppercase   transition w-full border border-black  ${type === '2' ? " bg-black text-white" : "bg-white" }`}>2 Wheeler</button>
          <button type='button' id='type' value="3" onClick={onChange} className={`px-7 py-3 ml-2 font-medium text-sm uppercase     transition w-full border border-black  ${type === '3' ? " bg-black text-white" : "bg-white" }`}>3 Wheeler</button>
          <button type='button' id='type' value="4" onClick={onChange} className={`px-7 py-3 ml-2 font-medium text-sm uppercase   transition w-full border border-black  ${type === '4' ? " bg-black text-white" : "bg-white" }`}>4 Wheeler</button>
         
        </div>

        <input type="text" placeholder='Title...' id="title" value={title} className='px-7 py-3 mt-6  border border-black w-full outline-none' onChange={onChange} maxLength="32" minLength="10" required />

      

      
      

        <textarea type="text" placeholder='Description' id="description" value={description} className='px-7 py-3 mt-6  border border-black w-full outline-none' onChange={onChange} required/>

        

        <div className='flex mt-4 '>
          <button type='button' id='offer' value={true} onClick={onChange} className={`px-7 py-3 mr-2 font-medium text-sm uppercase border border-black  transition w-full   ${!offer ? " text-black" : "bg-black text-white" }`}>Offer</button>
          <button type='button' id='offer' value={false} onClick={onChange} className={`px-7 py-3 ml-2 font-medium text-sm uppercase  border border-black transition w-full   ${ offer ? " text-black" : "bg-black text-white" }`}>No Offer</button>
        </div>
        
        { offer && (
          <div className='flex mt-4'>
          
            
          <input type="number" placeholder='Actual price in &#8377;' id='actualPrice'  value={actualPrice} className='w-full mr-2 py-3 px-4 border border-black  outline-none' onChange={onChange}  />
        
          { type === 'rent' && (
            <p className='text-sm'>&#8377; / months</p>
          )
          }
          
          <input type="number" placeholder="Discounted price" id='discountedPrice' value={discountedPrice} className='w-full ml-2 px-4 py-3 border border-black outline-none' onChange={onChange} />

        
         </div>
        )
        
        }

        { !offer && (
          <input type="number" placeholder={(type === 'sell' ? "Total Amount " : 'Amount / months' ) } id="totalAmount" value={totalAmount} className='px-7 py-3 mt-6 border border-black w-full outline-none' onChange={onChange} required/>
        )
        }

        <input type="email" placeholder='Enter Your Email' id="email" value={email} className='px-7 py-3 mt-6 border-black border w-full outline-none' onChange={onChange} required/>
        <input type="phone" placeholder='Enter Your Phone Number' id="phone" value={phone} className='px-7 py-3 mt-6  border-black border w-full outline-none' onChange={onChange} required/>



        <div className='mt-6'>
          <input type="file" id='images' onChange={onChange} accept='.jpg , .png , .jpeg' multiple required className='border border-black text-black py-2 px-4 w-full cursor-pointer'/>
          <p className='text-sm mt-2 text-red-500'>Note : the first image will be the cover and maximum 6 images are allowed</p>
        </div>

        <button type='submit' onClick={onChange} className={`px-7 py-3 mt-6 font-medium text-sm uppercase  transition w-full shadow bg-black hover:shadow-md text-white`}>ADD</button>

      </form>
    </main>
  )
}
