import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.model.js";

const generateToken = async (userDetails) => {
  console.log(userDetails);
  try {
    const user = await User.findById(userDetails._id);
    if (!user) {
      throw new Error("User not found");
    }
    const token = jsonwebtoken.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

export default generateToken;
