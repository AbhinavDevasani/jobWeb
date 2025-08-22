import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router";
function JobForm() {
  const formik = useFormik({
    initialValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      salary:"",
      jobType:"",
      
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Job title is required"),
      company: Yup.string().required("Company name is required"),
      location: Yup.string().required("Location is required"),
      description: Yup.string().required("Job description is required"),
      jobType:Yup.string().required("Job Type is required")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/jobs",
          values
        );
        console.log("Job created Successfully", response.data);
        resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });
  const navigate=useNavigate()
  const goToListPage=()=>{
    navigate("/jobs")
  }
  const goToHome=()=>{
    navigate("/")
  }
  return (
    <div>
        <nav className="flex w-full px-[4%] py-5 relative z-10 h-[5vh] sm:h-[15vh]">
            <div className="flex flex-column  w-full ">
            <div className="w-full flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="lucide lucide-briefcase w-6 h-6 text-white bg-blue-700 p-1 h-[5vh] w-[3vw] text-white rounded-xl">
                <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                </svg>
                <p className='font-[700] text-[20px] mt-[2px] ml-2'>SARKAR JOBS</p>
                <div className="flex gap-4 ml-6 mt-[5px] text-black ">
                    <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mt-1 text-gray-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <p className="hidden sm:block w-[4vw] ml-1 text-gray-700 font-[600] mt-[1px] cursor-pointer" onClick={()=>goToHome()}>Home</p>
                    </div>
                    <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mt-1 text-gray-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <p className="hidden sm:block w-[4vw] ml-1 text-gray-700 font-[600] mt-[1px] cursor-pointer" onClick={()=>goToListPage()}>Jobs</p>
                    </div>
                    <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mt-1 text-gray-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                        <p className="hidden sm:block w-[4vw] ml-1 text-gray-700 font-[600] mt-[1px] cursor-pointer">Application</p>
                    </div>
                </div>
            </div>
            </div>
        </nav>
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        sx={{ mt: 5 }}
        >
        <Typography variant="h4" fontWeight={700} gutterBottom>
            Post a New Job
        </Typography>

        <Paper elevation={3} sx={{ p: 4, width: "60%" }}>
            <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3} direction="column">
                {/* Job Title */}
                <Grid size={12}>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Job Title"
                    
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                </Grid>

                {/* Company */}
                <Grid size={12}>
                <TextField
                    fullWidth
                    id="company"
                    name="company"
                    label="Company"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.company && Boolean(formik.errors.company)}
                    helperText={formik.touched.company && formik.errors.company}
                />
                </Grid>

                {/* Location */}
                <Grid  size={12}>
                <TextField
                    fullWidth
                    id="location"
                    name="location"
                    label="Location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                    formik.touched.location && Boolean(formik.errors.location)
                    }
                    helperText={formik.touched.location && formik.errors.location}
                />
                </Grid>

                {/* Description */}
                <Grid size={12}>
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                    }
                    helperText={
                    formik.touched.description && formik.errors.description
                    }
                />
                </Grid>

                {/* Salary & Job Type Side by Side */}
                <Grid size={12}>
                <TextField
                    fullWidth
                    id="salary"
                    name="salary"
                    label="Salary"
                    value={formik.values.salary}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.salary && Boolean(formik.errors.salary)}
                    helperText={formik.touched.salary && formik.errors.salary}
                />
                </Grid>
                <Grid size={6}>
                <TextField
                    fullWidth
                    id="jobType"
                    name="jobType"
                    label="Job Type"
                    value={formik.values.jobType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.jobType && Boolean(formik.errors.jobType)}
                    helperText={formik.touched.jobType && formik.errors.jobType}
                />
                </Grid>

                {/* Submit Button */}
                <Grid size={12} textAlign="center">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ px: 4, py: 1 }}
                >
                    Submit
                </Button>
                </Grid>
            </Grid>
            </form>
        </Paper>
        </Box>
         <footer className="bg-[#0F172A] text-gray-300 py-10 px-6 flex flex-col justify-center align-center mt-10">
            <div className="max-w-7xl mx-auto gap-8 ">

                {/* Left Section - Logo + About */}
                <div className='flex flex-col items-center justify-center'>
                <div className=" gap-2 mb-3 flex flex-col  items-center justify-center">
                    {/* Icon */}
                    <div className="bg-blue-500 p-2 rounded-xl flex items-center justify-center w-[3vw]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="w-6 h-6"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.63a2.25 2.25 0 01-2.247 2.12H6.622a2.25 2.25 0 01-2.247-2.12L3.75 7.5m16.5 0a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25m16.5 0H3.75"
                        />
                    </svg>
                    </div>

                    <h2 className="text-white font-semibold text-lg">
                    SarkarJobs
                    </h2>
                </div>
                <p className="text-sm text-gray-400">
                    Corporate Part-time Jobs
                </p>
                <p className="mt-2 text-sm text-gray-400">
                    Connect with opportunities across India. Find part-time jobs that fit your skills and schedule.
                </p>
                </div>

                
                
            </div>

            {/* Bottom border */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
                © 2025 SarkarJobsIndia. All rights reserved.
            </div>
            </footer>
    </div>
  );
}

export default JobForm;
