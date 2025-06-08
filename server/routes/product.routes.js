import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getRelatedProducts,
  updateProduct,
} from "../controllers/productController.js";
import verifyToken from "../middlewares/varifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";

const productRouter = Router();

productRouter.post("/create-product", verifyToken, isAdmin, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", verifyToken, isAdmin, updateProduct);
productRouter.delete("/:id", verifyToken, isAdmin, deleteProduct);
productRouter.get("/related/:id", getRelatedProducts);

export default productRouter;
