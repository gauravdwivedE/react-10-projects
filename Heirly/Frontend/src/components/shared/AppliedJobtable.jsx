import React, { useEffect, useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import axios from "../../api/axios"

const AppliedJobtable = () => {
  const [appliedJobs, setAppliedJobs] = useState([])

  const getAppliedJobs = async () =>{
    try {
      const response = await axios.get("/applications", {withCredentials: true})
      setAppliedJobs(response.data)
    } catch (err) {
      
    }
  }
  useEffect(()=>{
    getAppliedJobs()
  },[])
  return (
    <>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appliedJobs && appliedJobs.map((item) => (
            <TableRow key={item}>
              <TableCell className="font-medium">{item.createdAt.split("T")[0]}</TableCell>
              <TableCell>{item.job?.title}</TableCell>
              <TableCell>{item.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge className={`w-20 text-center ${item.job?.applications[0].status == 'Accepted' && "bg-green-500"} ${item.job?.applications[0].status == 'Rejected' && "bg-red-500"}`}>{item.job?.applications[0].status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AppliedJobtable;
