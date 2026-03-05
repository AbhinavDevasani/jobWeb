import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, Box, Typography, Paper, Grid, IconButton, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import Cookies from "js-cookie";
import Footer from "../Footer";
import { FiX, FiFileText } from "react-icons/fi";
import { toast } from "react-toastify";
import Navbar from '../Navbar'
import AuthContext from "../Context/AuthContext";

function ApplyJob() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = React.useContext(AuthContext);
    const [profileResume, setProfileResume] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = Cookies.get("jwt_token");
            if (!token) {
                setLoadingProfile(false);
                return;
            }
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data?.resume) {
                    setProfileResume(res.data.resume);
                }
            } catch (err) {
                console.error("Error fetching profile resume:", err);
            } finally {
                setLoadingProfile(false);
            }
        };
        fetchProfile();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: user?.username || "",
            email: user?.email || "",
            number: "",
            description: "",
            resume: null,
            profileResume: profileResume || null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string().required("Email is required"),
            number: Yup.string().required("Number is required"),
            description: Yup.string().required("Description is required"),
            profileResume: Yup.mixed().nullable(),
            resume: Yup.mixed().nullable().test(
                "resumeRequired",
                "Resume is required",
                function (value, context) {
                    return value || context.parent.profileResume;
                }
            ).test(
                "fileType",
                "Only PDF allowed",
                function (value) {
                    // if value is null but profileResume exists, it's valid
                    if (!value) return true;
                    return value.type === "application/pdf";
                }
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

                if (values.resume) {
                    formData.append("resume", values.resume);
                } else if (profileResume) {
                    formData.append("profileResume", profileResume);
                }
                const token = Cookies.get("jwt_token");
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/users/jobs/applyJob`,
                    formData,
                    {
                        headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log("Job Applied Successfully", response.data);
                toast.success("Application submitted successfully");
                resetForm();
                navigate(`/jobs/${id}`);
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || "Failed to submit application");
            }
        },
        enableReinitialize: true // re-validate when profileResume state updates
    });
    return (
        <div>
            <Navbar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                sx={{ mt: 5, mb: 3 }}

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
                                {loadingProfile ? (
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <CircularProgress size={24} />
                                        <Typography variant="body2" color="textSecondary">
                                            Checking for saved profile resume...
                                        </Typography>
                                    </Box>
                                ) : (
                                    <>
                                        {profileResume && !formik.values.resume && (
                                            <Paper elevation={0} sx={{ p: 2, mb: 2, border: "1px solid #e0e0e0", borderRadius: 2, bgcolor: "#f5f5f5" }}>
                                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <FiFileText size={24} color="#3f51b5" />
                                                        <Box>
                                                            <Typography variant="subtitle2" fontWeight="600" color="textPrimary">
                                                                Using Saved Profile Resume
                                                            </Typography>
                                                            <Typography variant="caption" color="textSecondary">
                                                                Found a resume linked to your account.
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Button
                                                        size="small"
                                                        variant="text"
                                                        onClick={() => window.open(`${import.meta.env.VITE_BACKEND_URL}/${profileResume}`, "_blank")}
                                                    >
                                                        View PDF
                                                    </Button>
                                                </Box>
                                            </Paper>
                                        )}
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            fullWidth
                                        >
                                            {profileResume && !formik.values.resume ? "Upload a Different Resume (PDF)" : "Upload Resume (PDF)"}
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
                                    </>
                                )}

                                {formik.touched.resume && formik.errors.resume && (
                                    <Typography color="error" variant="body2" mt={1}>
                                        {formik.errors.resume}
                                    </Typography>
                                )}
                                {formik.values.resume && (
                                    <Box display="flex" alignItems="center" mt={1}>
                                        <Typography
                                            variant="body2"
                                            sx={{ color: "green", fontWeight: 500 }}
                                        >
                                            Selected file: {formik.values.resume.name}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => formik.setFieldValue("resume", null)}
                                            sx={{ ml: 1, p: 0.5 }}
                                        >
                                            <FiX size={16} />
                                        </IconButton>
                                    </Box>
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
