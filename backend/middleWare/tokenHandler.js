import jwt from "jsonwebtoken";
import User from '../model/userModel.js'
// Middleware to validate JWT
export const validateToken = async(req, res, next) => {
  let token;
  const userToken = req.headers.Authorization || req.headers.authorization;

  if (userToken && userToken.startsWith("Bearer")) {
    token = userToken.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_STRING, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Not a Valid user");
      }
      
      next();
    });
  
    if (!req.user) {
        return res.status(401).json({ message: "User not found" });
  }
    if (!token) {
      res.status(401);
      throw new Error("Token is Expired");
    }
  } else {
    res.status(401);
    throw new Error("Authorization header missing or invalid");
  }
};
