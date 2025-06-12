import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  updateUser,
  updateUserRole,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/varifyToken.js";


const userRouter = Router();

// ✅ Public Routes
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);

// ✅ Protected Routes
userRouter.post("/logout", verifyToken, logoutUser);

userRouter.get("/users", verifyToken, getAllUsers);
userRouter.get("/users/:id", verifyToken, getUserById); // Get user by ID

userRouter.put("/users/:id", verifyToken, updateUserRole);  // Updating role requires login
userRouter.patch("/users/:id", verifyToken, updateUser);    // Update user info

userRouter.delete("/users/edit/:id", verifyToken, deleteUser); // Delete user

export default userRouter;