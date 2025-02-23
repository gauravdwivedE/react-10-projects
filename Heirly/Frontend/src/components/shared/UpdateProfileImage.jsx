import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { toast } from 'sonner';
import { setLoading } from '@/store/reducer/loadingReducer';
import { setUser } from '@/store/reducer/authReducer';
import {LucideLoader2 } from 'lucide-react';

const UpdateProfileImage = ({ editOpen, setEditOpen }) => {
  const { loading } = useSelector((state) => state.showLoading)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const {register, handleSubmit, reset } = useForm()
  const [image, setImage] = useState(null); 

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result); 
      }
    }
  }
  
  const onSubmit = async () => {
    try {
      if(image){
        dispatch(setLoading(true))
        const response = await axios.patch('/user/profile/image', {image}, { withCredentials: true })
        
        if(response.status == 200){
          console.log(response.data.newImageURL);

          dispatch(setUser({
            ...user, // Spread the user object to keep all properties
            profile: {
              ...user.profile, // Spread the profile object to keep other profile details
              profilePhoto: response.data.newImageURL // Update only profilePhoto
            }
          }))

         toast.success("Profile Image Updated successsfully")
         setEditOpen(false)
      }
    }else{
      console.log("error");
      
    }
    } 
    catch (err) {
      toast.error(err.message || err.response.data)
    }
    finally{
      dispatch(setLoading(false))
    }
  }

  
  return (
    <Dialog open={editOpen}>
      <DialogContent className="w-fit h-fit bg-white p-2 rounded-lg shadow-lg" onInteractOutside={() => !loading && setEditOpen(false)}>
      
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 py-4">
          <img className = "h-[80vh] w-[33rem] object-cover rounded object-top" src = {image ? image : user?.profile?.profilePhoto}  />
          <DialogFooter>
            <div className='flex justify-between w-full'>
            <h1>
              <input type="file" {...register("profileImage")}
              accept="image/*"
              onChange={handleFileChange}
              className='outline-none w-[100px]'/>
              </h1>
            {loading ? (
              <button
                disabled
                className="px-5 p-2 text-sm bg-blue-400  text-white font-semibold rounded-md focus:outline-none"
              >
                <span className="w-full text-center space-x-6"> <LucideLoader2 className="inline animate-spin" /> Please wait..</span>
              </button>
            ) : (
              <button
                type="submit"
                className = {`px-5 p-2 text-sm text-white font-semibold rounded-md focus:outline-none ${image ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`} disabled = {image? false : true}
              >
                Save
              </button>
            )}
              </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileImage;
