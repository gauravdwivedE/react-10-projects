import React, { useEffect, useState } from 'react'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GetAllAdminJobs from '@/hooks/GetAllAdminJobs';

const AdminJobsTable = () => {

  GetAllAdminJobs()
  const {adminJobs, filterString} = useSelector((state) => state.adminJobs) 
  const navigate = useNavigate()
  const [filterJob, setFilterJob] = useState(adminJobs)  
  
  useEffect(() => {
   const filter = adminJobs && adminJobs.filter((job) => {
    if(!filterString || filterString.trim() === ''){
      return true
    }
    return job?.title?.toLowerCase().includes(filterString.toLowerCase()) ||  job?.company.name?.toLowerCase().includes(filterString.toLowerCase())
   })
   setFilterJob(filter)
  },[adminJobs, filterString])
    
  return (
    <Table>
  <TableCaption>A list of your recent posted jobs.</TableCaption>
  <TableHeader>
    <TableRow>

      <TableHead className="w-[250px]">Company</TableHead>
      <TableHead className="w-[250px]">Job Title</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filterJob?.map((job) => 
    <TableRow key = {job._id}>
      <TableCell>{job.company.name}</TableCell>
      <TableCell>{job.title}</TableCell>
      <TableCell>{job.createdAt.split("T")[0]}</TableCell>
      <TableCell className="text-right">
      <Popover>
  <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
   <PopoverContent className="w-fit mr-10 mt-1 py-2 space-y-1" >
    <span className="w-fit h-full flex items-center gap-4 text-sm cursor-pointer" onClick = {() => navigate(`/admin/jobs/${job._id}`)}>
    <Edit2 className='w-4'/>
    </span>

    <span className="w-fit h-full flex items-center gap-4 text-sm cursor-pointer" onClick = {() => navigate(`/admin/job/${job._id}/applicants`)}>
    <Eye className='w-4'/> Applicants
    </span>
    </PopoverContent>
  </Popover>
        </TableCell>
    </TableRow>
    )}
  </TableBody>
</Table>
  )
}

export default AdminJobsTable
