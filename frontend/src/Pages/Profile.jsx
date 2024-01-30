import userSlice from "../redux/user/userSlice"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Profile = () => {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">Profile</h1>

      

      <form className="flex flex-col gap-4 w-[80%] md:w-[40%] mx-auto mt-9" > 
      <img src={currentUser.data.photo ||  currentUser.data.data.photo} alt="Profile" className="w-14 h-10 rounded-full object-cover  cursor-pointer self-center"/>  
        <input type="text" id="username" placeholder="Enter your username" className="bg-gray-400 placeholder-white" required/>

        <input type="email" id="email"placeholder="Enter your email" className="bg-gray-400 placeholder-white"  required/>

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