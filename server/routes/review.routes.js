import { Router } from "express";
import { postReview } from "../controllers/reviewController.js";
import verifyToken from "../middlewares/varifyToken.js";

const reviewRouter = Router();

reviewRouter.post("/post-review", verifyToken, postReview);

export default reviewRouter;
