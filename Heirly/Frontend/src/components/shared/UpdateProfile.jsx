import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { toast } from 'sonner';
import { setLoading } from '@/store/reducer/loadingReducer';
import { setUser } from '@/store/reducer/authReducer';
import { LucideLoader2 } from 'lucide-react';

const UpdateProfile = ({ open, setOpen }) => {
  const { loading } = useSelector((state) => state.showLoading)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const {register, handleSubmit, reset, formState: { errors }} = useForm({defaultValues:{fullname:user?.fullname, email: user?.email, phoneNumber: user?.phoneNumber.toString(), bio:user.profile.bio, skills: user.profile.skills.join(", ")}})
  
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData()
    data.resume && formData.append("resume", data.resume[0])
     formData.append("fullname", data.fullname)
     formData.append("email", data.email)
     formData.append("phoneNumber", data.phoneNumber)
     formData.append("skills", data.skills)
     formData.append("bio", data.bio)    
    try {
        dispatch(setLoading(true)) 
        const response = await axios.put('/user/profile', formData, { withCredentials: true})
        if(response.status == 200){
         dispatch(setUser(response.data))
         toast.success("Profile Updated successsfully")
         setOpen(false)
       }
      } 
      catch (err) {
        toast.error(err.message || err.response.data)
      }
      finally{
        dispatch(setLoading(false))
      }
  }
  useEffect(() => {
    reset({
      fullname:user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber.toString(),
      bio: user.profile.bio,
      skills: user.profile.skills.join(", "),
    });
  }, [user, reset])
  
  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button variant="outline" className="px-4 py-2 rounded-lg border border-gray-300 shadow-md hover:bg-gray-100">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white p-6 rounded-lg shadow-lg" onInteractOutside={() => !loading && setOpen(false)}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Edit Profile</DialogTitle>
          <DialogDescription className="text-gray-500 text-sm">
            Update your profile details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 py-4">
          {/* Full Name Field */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="John Doe"
              {...register('fullname', { required: 'Full Name is required' })}
              className="mt-1 p-1 px-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.fullname && <p className="text-red-500 text-xs">{errors.fullname.message}</p>}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              {...register('email', { required: 'Email is required', pattern: { value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, message: 'Invalid email format' } })}
              className="mt-1 p-1 px-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Phone Number Field */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              maxLength={10}
              placeholder="+1234567890"
              {...register('phoneNumber', { required: 'Phone Number is required', pattern: { value: /^\+?[1-9]\d{1,14}$/, message: 'Invalid phone number' } })}
              className="mt-1 p-1 px-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
          </div>

          {/* Skills Field */}
          {user?.role === 'Job seeker' &&  
          <>
          <div className="flex flex-col">
            <label htmlFor="skills" className="text-sm font-medium text-gray-700">Skills</label>
            <input
              id="skills"
              type="text"
              placeholder="e.g., React, Node.js, Python"
              {...register('skills')}
              className="mt-1 p-1 px-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
       
          <div className="flex flex-col">
            <label htmlFor="bio" className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              id="bio"
              placeholder="Tell something about yourself..."
              {...register('bio')}
              className="mt-1 p-1 px-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
               
          <div className="flex flex-col">
            <label htmlFor="resume" className="text-sm font-medium text-gray-700">Resume</label>
            <input
              id="resume"
              type="file"
              accept=""
              {...register('resume', )}
              className="mt-1 p-1 px-2 w-full border rounded-lg cursor-pointer"
            />
            {errors.resume && <p className="text-red-500 text-xs">{errors.resume.message}</p>}
          </div>
          </>
        }

         {user?.profile?.resumeOriginalName && <p className='flex'>View resume  <a href = {user?.profile?.resume} target='_blanck' className='text-blue-600 hover:underline w-[20rem] truncate block ml-1'>{user?.profile?.resumeOriginalName}</a></p>}
          <DialogFooter>
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
                className="px-5 p-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md focus:outline-none"
              >
                Update Profile
              </button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfile;
