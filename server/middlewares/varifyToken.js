import { JsonWebTokenError } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("Decoded token:", decoded);
    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in verifyToken middleware:", error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

export default verifyToken;
