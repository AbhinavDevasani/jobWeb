import mongoose from 'mongoose';
//Job model
const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        
    },
    jobType:{
        type:String,
        required:true
    },
    postedAt:{
        type:Date,
        default:Date.now()
    },
    applicants: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ]
})
export default mongoose.model("Job",jobSchema,"Jobs")