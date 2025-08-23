import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../model/userModel.js";

// Register User
// POST
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are required");
  }

  //hashing the password
  const hashPassword = await bcrypt.hash(password, 10);
  //creating a new user
  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
  });
  res.json(newUser);
});
//login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401);
    throw new Error("All Fields are Required..!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("No User Found");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          _id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_STRING,
      { expiresIn: "1d" } 
    );

    
    res.json({
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});
//The current logged in user
export const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
