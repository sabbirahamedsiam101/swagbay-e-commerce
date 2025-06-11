import { Router } from "express";
import { getReviewsByProductId, postReview, totalReviews } from "../controllers/reviewController.js";
import verifyToken from "../middlewares/varifyToken.js";

const reviewRouter = Router();

reviewRouter.post("/post-review", verifyToken, postReview);
reviewRouter.get("/total-reviews", totalReviews);
reviewRouter.get("/:productId", getReviewsByProductId);

export default reviewRouter;
