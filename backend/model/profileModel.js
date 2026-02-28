import mongoose from "mongoose"

const profileSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    summary:{
        type:String,
        maxlength:500
    },

    skills:[String],

    experience:[{
        company:String,
        role:String,
        startDate:Date,
        endDate:Date,
        description:String
    }],

    education:[{
        institution:String,
        degree:String,
        startYear:Number,
        endYear:Number
    }],

    resume:String,
    profilePhoto:String

},{
    timestamps:true
})

export default mongoose.model("Profile",profileSchema)