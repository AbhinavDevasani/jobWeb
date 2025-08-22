import mongoose from 'mongoose';
//Job model
const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    comapany:{
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
    }
})
export default mongoose.model("Job",jobSchema,"Jobs")