import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please enter username"]
    },
    email:{
        type:String,
        required:[true,"Please enter Emailid"],
        unique:[true,"email already been taken"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"]
    }
},{
    timestamps:true
})

export default mongoose.model("User",userSchema)