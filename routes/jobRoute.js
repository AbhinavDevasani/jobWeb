import { postJobs ,updateJob,deleteJob,getJob} from "../controllers/jobController.js";
import express from 'express'
const route=express.Router() //route to use put, get post and delete methods
route.post("/jobs",postJobs)
route.put("/jobs/:id",updateJob)
route.delete("/jobs/:id",deleteJob)
route.get("/jobs",getJob)
export default route 