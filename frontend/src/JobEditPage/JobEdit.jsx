import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";
import { useNavigate ,useParams} from "react-router";
function JobEdit() {
    const {id}=useParams()
    const navigate=useNavigate()
    const [editSingleJob,setEditSingleJob]=useState([])
    useEffect(()=>{
        const getData=async()=>{
            const data=await axios.get(`http://localhost:8000/api/singleJob/${id}`)
            setEditSingleJob(data.data.data)
            
        }
        getData()
    },[])
    console.log(editSingleJob.title)
    const formik = useFormik({
        initialValues: {
        title: `${editSingleJob.title}`,
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
        }),
        onSubmit: async (values, { resetForm }) => {
        try {
            const response = await axios.put(
            `http://localhost:8000/api/jobs/${id}`,
            values
            );
            console.log("Job updated Successfully", response.data);
            navigate("/")
            resetForm();
        } catch (err) {
            console.log(err);
        }
        },
    });
    const goTOForm=()=>{
        navigate("/")
    }
    const goToListPage=()=>{
        navigate("/")
    }
  return (
    <div>
        <nav className=" flex w-full  px-[4%] py-5 relative z-10 h-[5vh] sm:h-[15vh] ">
            <div className="flex flex-column  w-full ">
                <div className="w-full flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="bg-blue-700 p-1 h-[5vh] w-[3vw] text-white rounded-xl lucide lucide-briefcase w-6 h-6 text-white" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  data-filename="layout" data-linenumber="183" data-visual-selector-id="layout183" data-source-location="layout:183:16" data-dynamic-content="false"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>
                <p className='font-[700] text-[20px] mt-[2px] ml-2'>SARKAR JOBS</p>
                <div className="flex gap-4 ml-6 mt-[5px] text-black ">
                    
                    <p className="hidden sm:block w-[4vw] cursor-pointer" onClick={()=>goTOForm()}>Job List</p>
                    <p className=' w-[5vw] '>Job Form</p>
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
            Edit the Job
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
                <div className="flex">
                    {/* Submit Button */}
                    <Grid size={12} textAlign="center">
                    <Button
                        
                        variant="contained"
                        color="primary"
                        sx={{ px: 4, py: 1 }}
                        onClick={()=>goToListPage()}
                    >
                        Cancel Changes
                    </Button>
                    </Grid>
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
                </div>
            </Grid>
            </form>
        </Paper>
        </Box>
    </div>
  );
}

export default JobEdit;
