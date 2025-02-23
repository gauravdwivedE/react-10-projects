import React, { useEffect, useState } from 'react'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Avatar } from '@/components/ui/avatar';
import { Edit2, MoreHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GetAllCompanies from '@/hooks/GetAllCompanies';

const CompaniesTable = () => {
  GetAllCompanies()
  const {companies, filterString} = useSelector((state) => state.company) 
  const navigate = useNavigate()
  const [filterCompany, setFilterCompany] = useState(companies)  
  
  useEffect(() => {
   const filter =  companies && companies.filter((company) => {
    if(!filterString || filterString.trim() === ''){
      return true
    }
    return company?.name?.toLowerCase().includes(filterString.toLowerCase())
   })
   setFilterCompany(filter)
  },[companies, filterString ])
  
  return (
    <Table>
  <TableCaption>A list of your recent companies.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[250px]">Logo</TableHead>
      <TableHead className="w-[250px]">Name</TableHead>
      <TableHead>Date</TableHead>
      <TableHead className="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {filterCompany?.map((company) => 
    <TableRow key = {company._id}>
      <TableCell className="font-medium">
      <Avatar className='cursor-pointer'>
          <AvatarImage src={company.logo} />
          <AvatarFallback className='flex justify-center items-center bg-black w-full text-white'>{company.name[0]}</AvatarFallback>   
        </Avatar>
      </TableCell>
      <TableCell>{company.name}</TableCell>
      <TableCell>{company.createdAt.split('T')[0]}</TableCell>
      <TableCell className="text-right">
      <Popover>
  <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
   <PopoverContent className="w-fit mr-10 mt-1 py-2" onClick = {() => navigate(`/admin/companies/${company._id}`)} >
    <span className="w-fit h-full flex items-center gap-4 text-sm cursor-pointer">
    <Edit2 className='w-4'/> Edit
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

export default CompaniesTable