import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from 'express'
import dotenv from 'dotenv'
import router1 from "./routes/jobRoute.js";
import cors from 'cors'
import router from './routes/userRoute.js'
import errorHandler from "./middleWare/errorHandler.js";

const app=express()
dotenv.config()
app.use(cors({
    origin: "http://localhost:5173",  // allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]  // include content-type
}));
app.use(bodyParser.json())
app.use("/api",router1)
app.use("/api/users",router)
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