import mongoose from 'mongoose';
//Job Apply model
const applySchema=new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    profileId:{type: mongoose.Schema.Types.ObjectId,ref: "Profile",required: true},
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    appliedAt:{
        type:Date,
        default:Date.now
    },
    resume: {
        type: String,
        required: true,
    },

})
export default mongoose.model("Application",applySchema,"Applications")