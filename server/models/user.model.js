import { Model, Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // 🔒 hides password in queries unless explicitly selected
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profileImage: {
      type: String,
      default: "https://example.com/default-profile-image.png",
    },
    bio: {
      type: String,
      default: "This is my bio.",
      maxlength: 160,
    },
    profession: {
      type: String,
      maxlength: 100,
    },
  },
  {
    timestamps: true, // 👌 adds createdAt and updatedAt automatically
  }
);

const User = new Model("User", userSchema);
module.exports = User;
