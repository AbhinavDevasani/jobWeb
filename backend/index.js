import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import router1 from "./routes/jobRoute.js";
import cors from "cors";
import router from "./routes/userRoute.js";
import errorHandler from "./middleWare/errorHandler.js";
import router2 from "./routes/applyRoute.js";
import router3 from "./routes/profileRoute.js";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://jobweb-1.onrender.com"],
    credentials: true
  })
);

app.use((req, res, next) => {
  next();
});

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.json());
app.use("/api", router1);
app.use("/api/users", router);
app.use("/api/users", router2);
app.use("/api/profile", router3);
app.use(errorHandler); //Used for error handling
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;
//Connection to mongoose
mongoose
  .connect(uri)
  .then(() => {
    console.log("Server connected to mongo db");
  })
  .catch((err) => {
    console.log("DB connection failure", err);
  });
app.listen(port, () => {
  console.log(`Server connected at port ${port}`);
});
