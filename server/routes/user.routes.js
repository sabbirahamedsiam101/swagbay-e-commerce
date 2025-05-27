import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

userRouter.post("/register", createUser);

userRouter.post("/login", loginUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
