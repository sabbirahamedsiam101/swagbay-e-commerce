import { Router } from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from "../controllers/categoryController.js";

const categoryRouter = Router();

categoryRouter.post("/create-category", createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/update-category/:id", updateCategoryById);
categoryRouter.delete("/delete-category/:id", deleteCategoryById);

export default categoryRouter;
