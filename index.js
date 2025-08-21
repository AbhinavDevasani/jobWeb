import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from 'express'
import dotenv from 'dotenv'
import route from "./routes/jobRoute.js";
import cors from 'cors'
import errorHandler from "./middleWare/errorHandler.js";
const app=express()
dotenv.config()
app.use(bodyParser.json())
app.use("/api",route)
app.use(cors)//cors policy
app.use(errorHandler)//Used for error handling
const port=process.env.PORT||5000
const uri=process.env.MONGO_URI
//Connection to mongoose
mongoose.connect(uri)
.then(()=>{
    console.log("Server connected to mongo db")
})
.catch((err)=>{
    console.log("DB connection failure",err)
})
app.listen(port,()=>{
    console.log(`Server connected at port ${port}`)
})