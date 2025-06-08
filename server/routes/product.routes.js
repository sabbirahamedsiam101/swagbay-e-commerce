import { Router } from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController.js";
import verifyToken from "../middlewares/varifyToken.js";

const productRouter = Router();

productRouter.post("/create-product", verifyToken, createProduct);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getAllProducts);
productRouter.put("/:id", (req, res) => {
  // Logic to update a product by ID
  const { id } = req.params;
  res.status(200).json({ message: `Product ${id} updated successfully` });
});
productRouter.delete("/products/:id", (req, res) => {
  // Logic to delete a product by ID
  const { id } = req.params;
  res.status(200).json({ message: `Product ${id} deleted successfully` });
});

export default productRouter;
