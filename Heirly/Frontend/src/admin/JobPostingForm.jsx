import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Navbar from "@/components/shared/Navbar"
import { Button } from "@/components/ui/button"
import axios from "../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

const JobPostingForm = () => {
  const { register, handleSubmit, formState: { errors }} = useForm()
  const { companies } = useSelector((state) => state.company)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/jobs", data, {withCredentials: true})
     if(response.status === 201){
      toast.success("Job created successfully")
      navigate("/admin/jobs")
     }
      
    } 
    catch (err) {
      toast.error(err.response.data || err.message || err.response.data.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md mt-12">
        <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              {...register("title", { required: true })}
              placeholder="Title"
              className={`p-2 border rounded outline-none text-sm ${errors.title ? "border-red-500" : "border-gray-300"}`}
            />
            <input
              {...register("description", { required: true })}
              placeholder="Description"
              className={`p-2 border rounded outline-none text-sm ${errors.description ? "border-red-500" : "border-gray-300"}`}
            />
            <input
              {...register("requirements", { required: true })}
              placeholder="Requirements"
              className={`p-2 border rounded outline-none text-sm ${errors.requirements ? "border-red-500" : "border-gray-300"}`}
            />
            <input
              {...register("salary", { required: true, pattern: /^[0-9]+$/ })}
              type="text"
              placeholder="Salary"
              className={`p-2 border rounded outline-none text-sm ${errors.salary ? "border-red-500" : "border-gray-300"}`}
            />
            <input
              {...register("location", { required: true })}
              placeholder="Location"
              className={`p-2 border rounded outline-none text-sm ${errors.location ? "border-red-500" : "border-gray-300"}`}
            />
            <input
              {...register("jobType", { required: true })}
              placeholder="Job Type"
              className={`p-2 border rounded outline-none text-sm ${errors.jobType ? "border-red-500" : "border-gray-300"}`}
            />
            <input
              {...register("experience", { required: true, pattern: /^[0-9]+$/ })}
              type="text"
              placeholder="Experience Level"
              className={`p-2 border rounded outline-none text-sm ${errors.experience ? "border-red-500" : "border-gray-300"}`}
            />
            <input
              {...register("position", { required: true, pattern: /^[0-9]+$/ })}
              type="text"
              placeholder="No of Positions"
              className={`p-2 border rounded outline-none text-sm ${errors.position ? "border-red-500" : "border-gray-300"}`}
            />

            {/* Standard HTML Select Input with error handling */}
            <select
              {...register("company", { required: true })}
              className={`p-2 border rounded outline-none text-sm ${errors.company ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Select a Company</option>
              {companies &&
                companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
            </select>
          </div>
        <div className="flex gap-5">
         <Button type="submit" variant = "outline" onClick  = {() => navigate(-1) }> <ArrowLeft /> Back</Button>
         <Button type="submit">Post New Job </Button>
        </div>
        </form>
      </div>
    </>
  );
};

export default JobPostingForm;
