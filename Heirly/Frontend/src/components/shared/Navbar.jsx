import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import { User2 } from "lucide-react";
import { LogOut } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Link, useNavigate, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios";
import { setUser } from "@/store/reducer/authReducer";
import { toast } from "sonner";
import { Loader2 } from 'lucide-react'

const Navbar = () => {  
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  async function handleLogout() {
    try {
        setLoading(true)
      const response = await axios.post('/user/logout')
      if(response.status === 200){
        toast.success(response.data.message)
        dispatch(setUser(null))
        navigate("/")
      }
    }
    catch (err) {
      toast.error(err.response.data)
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="flex justify-between  px-8 py-3 items-center">
      { loading &&  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <Loader2 className="text-white animate-spin" size={50} /> Logging out
    </div> }
      <h1 className="font-semibold text-2xl">Heir<span className="text-orange-700">ly</span></h1>
      <div className="flex items-center gap-10">
        <ul className="flex gap-8 cursor-pointer">
          {user?.role === 'Recruiter' ? (
          <>
          <Link to="/admin/companies" className="text-sm">Companies</Link>
          <Link to="/admin/jobs" className="text-sm">Jobs</Link>
          </>)
          :(
          <>
           <Link to="/" className="text-sm">Home</Link>
          <Link to="/jobs" className="text-sm">Jobs</Link>
          <Link to = "/browse" className="text-sm">Browse</Link>
         
          </>)
      }
        </ul>

        {
        !user ?
        <div className="space-x-3">
          <Link to = "/login"> <Button variant='outline' > Login </Button></Link>
          <Link to = "/signup"> <Button className='bg-[#6a38c2] hover:bg-[#572d9e]'> Signup </Button> </Link>
        </div>:
        <Popover>
        <PopoverTrigger>
          <Avatar className='cursor-pointer'>
            <AvatarImage src={ user?.profile?.profilePhoto || '' } className='object-cover object-top'/>
          <AvatarFallback>{ user?.fullname[0] }</AvatarFallback>     {/* name here */}
         </Avatar>
        </PopoverTrigger>
         <PopoverContent className="mr-2">
         <div>
          
          <div className="flex items-center gap-2">
          <Avatar className='cursor-pointer'>
            <AvatarImage src={user.profile.profilePhoto} className='object-cover object-top' />
          <AvatarFallback className= "capitalize">{ user?.fullname[0] }</AvatarFallback>   {/* name here */}
          </Avatar>
          <h1 className="text-md font-semibold capitalize">{user?.fullname}</h1>
          </div>
          <p className="text-[12px] text-zinc-400 mt-1">
            {user?.role == 'Job seeker' && user?.profile?.bio}
          </p>
           <div className="space-y-1 mt-2">
           <Link to = "/profile" className="flex items-center gap-1 "><User2 /><Button variant="link">View Profile</Button></Link>
           <div className="flex items-center gap-1" ><LogOut /><Button variant="link" onClick = {()=> handleLogout()}>Log out</Button></div>
           </div>
          </div>
         </PopoverContent>
        </Popover>    
}   
      </div>
    </div>
  );
};

export default Navbar;
