import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  Avatar,
  Box
} from "@mui/material";
import { useNavigate } from "react-router";
import Footer from '../Footer'
import Navbar from '../Navbar'

function JobList() {

  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true)

    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/getApplicants`
        )
        setApplicants(response.data)
      } catch (err) {
        console.log("Error", err)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])

  return (
    <div>
      <Navbar />

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center w-full my-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : applicants.length === 0 ? (
        <p className="text-center text-gray-600 mt-6">
          No applicants found
        </p>
      ) : (

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

          {applicants.map((item) => (

            <Card
                key={item._id}
                sx={{ borderRadius: 3, p: 2, boxShadow: 3 }}
                className="hover:shadow-xl transition duration-300"
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar>{item?.name?.charAt(0)}</Avatar>

                    <Box>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Job Info */}
                  <Typography variant="subtitle1">
                    {item.jobId?.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.jobId?.company} • {item.jobId?.location}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Applied: {new Date(item.appliedAt).toLocaleDateString()}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(`/applicant/${item._id}`)}
                  >
                    View Profile
                  </Button>

                </CardContent>
              </Card>
          ))}

        </div>

      )}

      <Footer />
    </div>
  )
}

export default JobList