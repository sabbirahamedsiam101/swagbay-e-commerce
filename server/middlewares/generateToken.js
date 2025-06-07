// utils/generateToken.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = async (userDetails) => {
  try {
    const user = await User.findById(userDetails._id).select("_id name email role");
    if (!user) {
      throw new Error("User not found");
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Failed to generate authentication token");
  }
};

export default generateToken;
