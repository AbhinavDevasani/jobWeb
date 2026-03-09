import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Footer from "../Footer";
import Navbar from '../Navbar';
function JobForm() {
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
        validationSchema: Yup.object({
            title: Yup.string().required("Job title is required"),
            company: Yup.string().required("Company name is required"),
            location: Yup.string().required("Location is required"),
            description: Yup.string().required("Job description is required"),
            jobType: Yup.string().required("Job Type is required")
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/jobs`,
                    values
                );
                console.log("Job created Successfully", response.data);
                toast.success("Job created successfully");
                resetForm();
                navigate("/jobs");
            } catch (err) {
                console.log(err);
                toast.error("Failed to post job");
            }
        },
    });

    return (
        <div>
            <Navbar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ mt: 5, mb: 4 }}

            >
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Post a New Job
                </Typography>

                <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, width: { xs: "95%", sm: "80%", md: "60%", }, }}>
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
                                    sx={{ px: { xs: 2, md: 4 }, py: 1, width: { xs: "100%", sm: "auto" } }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
            <Footer />
        </div>
    );
}

export default JobForm;
