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
    if(search){
        query.title={$regex:search,$options:'i'}
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