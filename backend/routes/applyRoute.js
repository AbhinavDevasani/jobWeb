import express from 'express'
import { applyJob, getApplicants } from '../controllers/applyController.js'
const router2=express.Router()
router2.post("/jobs/applyJob",applyJob)
router2.get("/getApplicants",getApplicants)
export default router2