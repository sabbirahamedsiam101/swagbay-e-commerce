
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // attach user to req
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);

    // Differentiate between expired and invalid token
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;
