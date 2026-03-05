import express from 'express'
import { applyJob, getApplicants ,checkApplication,getSingleApplicant} from '../controllers/applyController.js'
import uploadResume from '../middleWare/uploadResume.js'
import { validateToken } from '../middleWare/tokenHandler.js'
import { get } from 'mongoose'
const router2=express.Router()
router2.post("/jobs/applyJob",validateToken,uploadResume.single("resume"),applyJob)
router2.get("/getApplicants",getApplicants)
router2.get("/checkApplication/:jobId", checkApplication);
router2.get("/applicant/:id",getSingleApplicant)
export default router2