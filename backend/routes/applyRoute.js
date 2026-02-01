import express from 'express'
import { applyJob, getApplicants ,checkApplication} from '../controllers/applyController.js'
import uploadResume from '../middleWare/uploadResume.js'
const router2=express.Router()
router2.post("/jobs/applyJob",uploadResume.single("resume"),applyJob)
router2.get("/getApplicants",getApplicants)
router2.get("/checkApplication/:jobId", checkApplication);
export default router2