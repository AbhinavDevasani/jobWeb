import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

// Middleware to validate JWT and attach user
export const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_STRING);

    
    const user = await User.findById(decoded.user._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // 👈 attach user to request
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Not a valid token" });
  }
};
