import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from 'react-router-dom';
import GetAllApplicants from '@/hooks/GetAllApplicants';
import { useDispatch, useSelector } from 'react-redux';
import { Check, Loader2, MoreHorizontal, TimerIcon, XIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import axios from '../api/axios';
import { toast } from 'sonner';
import { setApplicants } from '@/store/reducer/ApplicantsReducer';


const ApplicantTable = () => {
  const {id: jobId} = useParams()
  const [changeStatusLoading, setChangeStatusLoading] = useState(false)
  const {applicants} = useSelector((state) => state.applicants)
  GetAllApplicants(jobId, changeStatusLoading)

  async function statusHandler(status, applicantID){
    try {
      setChangeStatusLoading(true)
      const response = await axios.put(`/applications/status/${applicantID}`,{status}, {withCredentials: true})
      if(response.status === 200){
        toast.success(`Applicant application status changed to ${status}`)
      }
    } catch (err) {
      toast.error(err.response?.data || err.response?.data?.message || err.message)
    }
    finally{
      setChangeStatusLoading(false)
    }
  }

  return (
    <div className="p-6">
    <h2 className="text-xl font-semibold mb-4">Applicants ({applicants?.applications?.length})</h2>
    <Table>
    {applicants && applicants.applications.length > 0 ?  
      <TableCaption>A list of  applied users for this job</TableCaption> :
      <TableCaption>No applicants for this job</TableCaption>
    }
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applicants && applicants.applications.length > 0 && applicants?.applications?.map((application, index) => (
          <TableRow key={index}>
            <TableCell className = "capitalize">{application?.applicant?.fullname}</TableCell>
            <TableCell>{application?.applicant?.email}</TableCell>
            <TableCell>{application?.applicant?.phoneNumber}</TableCell>
            <TableCell><a href={application?.applicant?.profile?.resume && application?.applicant?.profile?.resume} target='_blank' className='text-blue-600'>{application?.applicant?.profile?.resume? "View Resume" : "No resume uploaded"}</a></TableCell>
            <TableCell>{application?.applicant?.createdAt.split("T")[0]}</TableCell>
            <TableCell className="w-[120px]"> {changeStatusLoading ? <Loader2 className='animate-spin w-4'/> : <span className={`px-2 py-1 rounded ${application?.status == 'Accepted' && "bg-green-400"} ${application?.status == 'Rejected' && "bg-red-400" } ${application?.status == 'Pending' && "bg-gray-400" }`}> {application?.status}</span>}</TableCell>
            <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                  <PopoverContent className="px-2 pr-10 mr-10 mt-1 py-2 p right-2 space-y-2 rounded-lg z-50  bg-white border-[1px]">
                    <span className="w-fit h-full flex items-center gap-2 text-sm cursor-pointer hover:text-green-500" onClick = { () => statusHandler("Accepted", application?._id) }>
                      Accept <Check className='w-4'/>
                    </span>
                    <span className="w-fit h-full flex items-center gap-2 text-sm cursor-pointer hover:text-red-500"  onClick = { () => statusHandler("Rejected", application?._id) }>
                       Reject <XIcon className='w-4'/>
                    </span>
                    <span className="w-fit h-full flex items-center gap-2 text-sm cursor-pointer hover:text-gray-500"  onClick = { () => statusHandler("Pending", application?._id) }>
                       Pending <TimerIcon className='w-4'/>
                    </span>
                  </PopoverContent>
                </Popover>
                
              </TableCell>
          </TableRow>
        ))
        }
      </TableBody>
    </Table>
  </div>
  )
}

export default ApplicantTable