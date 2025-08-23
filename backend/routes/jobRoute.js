import { postJobs ,updateJob,deleteJob,getJob,singleJob} from "../controllers/jobController.js";

import express from 'express'
const router1=express.Router() //route to use put, get post and delete methods
router1.route("/jobs").post(postJobs)
router1.route("/jobs/:id").put(updateJob).delete(deleteJob).get(singleJob)
//route.delete("/jobs/:id",deleteJob)
router1.route("/jobs").get(getJob)
//route.get("/jobs/:id",singleJob)

export default router1 