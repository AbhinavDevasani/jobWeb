import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const validateToken = async (req, res, next) => {
  let token;
  const userToken = req.headers.authorization || req.headers.Authorization;

  if (userToken && userToken.startsWith("Bearer")) {
    try {
      token = userToken.split(" ")[1];

      // verify returns decoded payload directly
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_STRING);

      // find user and attach
      req.user = await User.findById(decoded.user._id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Not a valid token" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Authorization header missing or invalid" });
  }
};
