import jwt from "jsonwebtoken";

// Middleware to validate JWT
export const validateToken = (req, res, next) => {
  let token;
  const userToken = req.headers.Authorization || req.headers.authorization;

  if (userToken && userToken.startsWith("Bearer")) {
    token = userToken.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_STRING, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Not a Valid user");
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("Token is Expired");
    }
  } else {
    res.status(401);
    throw new Error("Authorization header missing or invalid");
  }
};
