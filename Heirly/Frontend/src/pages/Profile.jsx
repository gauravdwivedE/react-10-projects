import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PencilIcon, MailIcon, PhoneIcon } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import AppliedJobtable from '../components/shared/AppliedJobtable';
import UpdateProfile from '../components/shared/UpdateProfile';
import { useSelector } from "react-redux";
import UpdateProfileImage from '../components/shared/UpdateProfileImage';

const Profile = () => {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const { user } = useSelector((state) => state.user)
 console.log(user);
 
  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center  p-3">
      <div className="w-full max-w-full rounded-2xl border-[1px] border-zinc-300 bg-white">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex gap-4 items-center">
          <div className="text-center">
         {user?.profile?.profilePhoto ?  <img className = "w-20 h-20 rounded-full object-cover object-top" src={user?.profile?.profilePhoto} /> : <span className = "w-20 h-20 rounded-full  flex justify-center items-center border-gray-300 border-[1px] text-2xl" > { user?.fullname[0] }</span>}
          <h2 className="text-blue-500 cursor-pointer" onClick={()=> setEditOpen(true)}>Edit</h2>
          </div>
          <h2 className="text-lg font-semibold capitalize">{user?.fullname}</h2>
          </div>
          <Button onClick = {()=>setOpen(true)} variant="ghost" size="icon">
            <PencilIcon  className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
        {user?.role === 'Job seeker' && 
          <p className="text-sm text-gray-500 mb-4">
           {user?.profile?.bio}
          </p>
          }
          <div className="flex items-center space-x-2 text-sm mb-4">
            <MailIcon className="h-4 w-4 text-gray-600" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm mb-4">
            <PhoneIcon className="h-4 w-4 text-gray-600" />
            <span>{user?.phoneNumber}</span>
          </div>
          {user?.role === 'Job seeker' &&  
          <>
          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? user?.profile?.skills?.map((skill,idx)=>
              <Badge key = {idx} className="bg-blue-500 text-white">{skill}</Badge>)
              :<p className="font-semibold">Update skills</p>
              }
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-2">Resume</p>
            <a href= {user?.profile?.resume} target="_blank"  className="text-sm text-blue-600 hover:underline">
              {user?.profile?.resumeOriginalName}
            </a>
          </div>
          </>
}
        </div>
      </div>
      {user?.role == 'Job seeker' && 
      <div className="w-full mx-auto rounded-full px-2"> 
        <h1 className="font-semibold text-xl my-4">Applied Jobs</h1>
      <AppliedJobtable/>
      </div>
}
    </div>
    {open && <UpdateProfile open = {open} setOpen = {setOpen}/>}
    {editOpen && <UpdateProfileImage editOpen = {editOpen} setEditOpen = {setEditOpen}/>}
    </>
  )
}

export default Profile
