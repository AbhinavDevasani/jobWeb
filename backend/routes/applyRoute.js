import express from 'express'
import { applyJob, getApplicants ,checkApplication} from '../controllers/applyController.js'
const router2=express.Router()
router2.post("/jobs/applyJob",applyJob)
router2.get("/getApplicants",getApplicants)
router2.get("/checkApplication/:jobId", checkApplication);
export default router2