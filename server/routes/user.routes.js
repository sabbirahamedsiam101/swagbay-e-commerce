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

const userRouter = Router();

userRouter.get("/users", getAllUsers);

userRouter.get("/users/:id", getUserById);

userRouter.post("/register", createUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", logoutUser);

// update user role
userRouter.put("/users/:id", updateUserRole);
// update user details
userRouter.patch("/users/:id", updateUser);

userRouter.delete("/users/edit/:id", deleteUser);

export default userRouter;
