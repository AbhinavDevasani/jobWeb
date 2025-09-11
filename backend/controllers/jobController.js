import Job from '../model/jobModel.js'
//Create Job
export const postJobs=async(req,res)=>{
    const data=new Job(req.body)
    const savedData=await data.save()
    try{
        res.status(200).json({
            message:"Job is successfully uploaded",
            savedData
        })
    }
    catch(err){
        res.status(400).json({
            message:"Job is not uploaded correctly",
            err
        })
    }
}
//Update Job
export const updateJob=async(req,res)=>{
    const jobId=req.params.id;
    const updateJob= req.body;
    const updatedJob=await Job.findByIdAndUpdate(
            jobId,
            updateJob
    )
    try{
        
        res.status(200).json({
            message:"Job is updated Successfully",
            updatedJob
        })
    }
    catch(err){
        res.status(400).json({
            message:"Job is not updated successfully",
            err
        })
    }
}
//Delete Job
export const deleteJob=async(req,res)=>{
    const id=req.params.id
    const deleteJob=req.body
    const deletedJob=await Job.findByIdAndDelete(
        id,
        deleteJob
    )
    try{
        res.status(200).json({
            message:"Successfully deleted the job",
            deletedJob
        })
    }
    catch(err){
        res.status(400).json({
            message:"Job is not deleted successfully",
            err
        })
    }
}
//Read
export const getJob=async(req,res)=>{
    const page=parseInt(req.query.page)||1
    const limit=parseInt(req.query.limit)||10
    const search=req.query.search
    const skip=(page-1)*limit
    let query={}
    if (search) {
        query = {
            $or: [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { company: { $regex: search, $options: "i" } }
        ]
    };  
    }
    const totalItems=await Job.countDocuments(query)
    const jobs=await Job.find(query)
                        .skip(skip)
                        .limit(limit)
                        .exec()
    try{
        res.status(200).json({
            jobs,
            currentPage:page,
            totalPages:Math.ceil(totalItems/limit),
            totalItems
        })
    }
    catch(err){
        res.status(400).json({
             message: 'Server error', 
             error: err.message
        })
    }
}
//single Job
export const singleJob=async(req,res)=>{
    const id=req.params.id;
    const data=await Job.findById(id)
    try{
        
        res.status(200).json({
            message:"Single job fetched successfully",
            data
        })
    }
    catch(err){
        res.staus(400).json({
            message:"Single job didn't fetch sucessfully",
            err
        })
    }

}
//apply job
export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user._id;

    const job = await Job.findById(jobId);
    // prevent duplicate applications
    if (job.applicants.includes(userId)) {
      return res.status(400).json({ message: "Already applied" });
    }

    job.applicants.push(userId);
    await job.save();

    res.status(200).json({ message: "Applied successfully", job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get applications
export const getApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("applicants", "username email"); // only show name & email

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json(job.applicants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};