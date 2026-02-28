import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, Box, Typography, Paper, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import Footer from "../Footer";
import Navbar from "../Navbar";
function ApplyJob() {
    const { id } = useParams()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            number: "",
            description: "",
            resume: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().required("Email is required"),
            number: Yup.string().required("Number is required"),
            description: Yup.string().required("Description is required"),
            resume: Yup.mixed()
                .required("Resume is required")
                .test(
                    "fileType",
                    "Only PDF allowed",
                    (value) => value && value.type === "application/pdf"
                ),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();

                formData.append("name", values.name);
                formData.append("email", values.email);
                formData.append("number", values.number);
                formData.append("description", values.description);
                formData.append("jobId", id);
                formData.append("resume", values.resume);

                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/users/jobs/applyJob`,
                    formData
                );

                console.log("Job Applied Successfully", response.data);
                alert("Application submitted successfully");
                resetForm();
                navigate(`/jobs/${id}`);
            } catch (err) {
                console.error(err);
                alert(err.response?.data?.message || "Failed to submit application");
            }
        }

    });

    const navigate = useNavigate()
    

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
                    Apply for the Job
                </Typography>

                <Paper elevation={3} sx={{ p: 4, width: { xs: "60%", sm: "60%", md: "30%", }, }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={3} direction="column">
                            {/* Name */}
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"

                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>

                            {/* Company */}
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>

                            {/* number */}
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    id="number"
                                    name="number"
                                    label="Phone Number"
                                    value={formik.values.number}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.number && Boolean(formik.errors.number)
                                    }
                                    helperText={formik.touched.number && formik.errors.number}
                                />
                            </Grid>

                            {/* Description */}
                            <Grid size={12}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Why should we hire you?"
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
                            <Grid size={12}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    fullWidth
                                >
                                    Upload Resume (PDF)
                                    <input
                                        type="file"
                                        hidden
                                        accept="application/pdf"
                                        onChange={(event) => {
                                            console.log(event.currentTarget.files[0]);
                                            formik.setFieldValue(
                                                "resume",
                                                event.currentTarget.files[0]
                                            );
                                        }}
                                    />
                                </Button>

                                {formik.touched.resume && formik.errors.resume && (
                                    <Typography color="error" variant="body2">
                                        {formik.errors.resume}
                                    </Typography>
                                )}
                                {formik.values.resume && (
                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 1, color: "green", fontWeight: 500 }}
                                    >
                                        Selected file: {formik.values.resume.name}
                                    </Typography>
                                )}
                                {formik.values.resume && (
                                    <Button
                                        variant="text"
                                        sx={{ mt: 1 }}
                                        onClick={() =>
                                            window.open(
                                                URL.createObjectURL(formik.values.resume),
                                                "_blank"
                                            )
                                        }
                                    >
                                        Preview Resume
                                    </Button>
                                )}
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
            <Footer />
        </div>
    );
}

export default ApplyJob;
