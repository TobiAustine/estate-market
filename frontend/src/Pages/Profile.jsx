import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";


const Profile = () => {
  const fileRef = useRef(null)
  const {currentUser} = useSelector(state => state.user)
  const [file, setFile] = useState(null)
  console.log(file); 
  const [progress, setProgress] = useState('')
  const [uploadError, setUploadError] = useState(false)
  const [formData, setFormData] = useState({}) 
  console.log(formData);
  console.log(uploadError);
  
  useEffect(() => {
   if(file){
    handleFileUpload(file)
   }
  }, [file])

  const handleFileUpload = (e) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + e.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, e)

      uploadTask.on('state_changed', 
      (snapshot)  =>{
        const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100 

        console.log(`upload is ${progress} % done`);
        setProgress(Math.round(progress))
   },

   (error) =>{
    setUploadError(true)
   },
 
   () =>{ 
    getDownloadURL(uploadTask.snapshot.ref).then
    ((downloadURL) =>{
          setFormData({...formData , photo: downloadURL})
    })
   })
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">Profile</h1>

    
      <form className="flex flex-col gap-4 w-[80%] md:w-[40%] mx-auto mt-9 mb-3" > 
      <input type="file" name="" id="" className="mb-4 " ref={fileRef} hidden accept="image/*" onChange={(e) => setFile(e.target.files[0])}/>

    

      <img src={     
        formData.photo || currentUser.data.photo ||  currentUser.data.data.photo} 
      
      
      
      alt="Profile" className="w-24 h-14 rounded-md object-contain  cursor-pointer self-center" onClick={() => fileRef.current.click()}/>  

     {file &&
     (<small className="text-center block text-green-600  w-[80%] md:w-[40%] mx-auto  mt-5 ">Percentage upload is  {progress}% </small> ) 
      
      }





      {
        uploadError && <p className="text-red-700 ">An Error occured!!!</p>
      }
     
        <input type="text" id="username" placeholder="Enter your username" className="bg-gray-400 placeholder-white" required autoComplete='true'/>

        <input type="email" id="email"placeholder="Enter your email" className="bg-gray-400 placeholder-white"  required autoComplete='true'/>

        <input type="password"  id="password" placeholder="Enter password" className="bg-gray-400 placeholder-white" />

        <button type="submit" className="bg-purple rounded-md text-white h-[2rem] hover:bg-opacity-70 disabled:opacity-80">UPDATE</button>
        <button type="submit" className="bg-tertiary rounded-md text-white h-[2rem] hover:bg-opacity-70">CREATE LISTING</button>
      </form>
      <div className=" flex justify-between w-[80%] md:w-[40%] mx-auto mt-2" >
         <span className="text-red-600 cursor-pointer">Delete Account </span>

         <span className="text-red-600 cursor-pointer">Sign Out </span>
      </div>
 <div className="text-center block text-tertiary  w-[80%] md:w-[40%] mx-auto mt-5">Show listings</div>
    </div>
  )
}

export default Profile