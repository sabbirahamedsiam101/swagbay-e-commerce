import { Router } from "express";
import {
  getReviewsByProductId,
  postReview,
  deleteReview,
  bulkDeleteReviews,
  getAllReviews,
} from "../controllers/reviewController.js";
import verifyToken from "../middlewares/varifyToken.js";
import isAdmin from "../middlewares/isAdmin.js";
const reviewRouter = Router();

reviewRouter.post("/post-review", verifyToken, postReview);
reviewRouter.get("/:productId", getReviewsByProductId);

// Admin routes
reviewRouter.get("/admin/all-reviews", verifyToken, isAdmin, getAllReviews);
reviewRouter.delete(
  "/admin/delete/:reviewId",
  verifyToken,
  isAdmin,
  deleteReview
);
reviewRouter.post(
  "/admin/bulk-delete",
  verifyToken,
  isAdmin,
  bulkDeleteReviews
);

export default reviewRouter;
