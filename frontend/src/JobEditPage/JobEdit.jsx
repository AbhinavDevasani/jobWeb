import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect } from "react";
import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import Footer from "../Footer";
import Navbar from '../Navbar';
function JobEdit() {
    const { id } = useParams()
    const navigate = useNavigate()



    const formik = useFormik({
        initialValues: {
            title: "",
            company: "",
            location: "",
            description: "",
            salary: "",
            jobType: "",

        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required("Job title is required"),
            company: Yup.string().required("Company name is required"),
            location: Yup.string().required("Location is required"),
            description: Yup.string().required("Job description is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`,
                    values
                );
                console.log(response)
                alert("Job updated successfully")
                navigate("/jobs")
                resetForm();
            } catch (err) {
                console.log(err);
            }
        },
    });
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/${id}`);

                formik.setValues({
                    title: response.data.data.title || "",
                    company: response.data.data.company || "",
                    location: response.data.data.location || "",
                    description: response.data.data.description || "",
                    salary: response.data.data.salary || "",
                    jobType: response.data.data.jobType || "",
                });
            } catch (err) {
                console.error("Error fetching job:", err);
            }

        };

        fetchJob();
    }, [id]);

    const goToListPage = () => {
        navigate("/jobs")
    }
    
    return (
        <div>
            <Navbar />
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

                <Paper elevation={3} sx={{ p: 4, width: { xs: "60%", sm: "60%", md: "60%", }, }}>
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
                            <Grid size={12}>
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

                            {/* Salary & Job Type */}
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
                                        sx={{ px: { md: 4 }, py: { md: 1 }, fontSize: { xs: "8px", md: "1rem" }, }}
                                        onClick={() => goToListPage()}
                                    >
                                        Cancel Changes
                                    </Button>
                                </Grid>
                                <Grid size={12} textAlign="center">
                                    <Button
                                        type="submit"

                                        variant="contained"
                                        color="primary"
                                        sx={{ px: { md: 4 }, py: 1, fontSize: { xs: "10px", md: "1rem" }, }}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </div>
                        </Grid>
                    </form>
                </Paper>
            </Box>
            <Footer />
        </div>
    );
}

export default JobEdit;
