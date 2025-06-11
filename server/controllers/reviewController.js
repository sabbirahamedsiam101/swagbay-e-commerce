import Review from "../models/reviews.model.js";
import Product from "../models/products.model.js";

export const postReview = async (req, res) => {
  const { productId, comment, rating } = req.body;
  const userId = req?.user?.id;
  console.log("User ID:", userId);
  console.log("Product ID:", productId);
  try {
    // Validate input
    if (!productId || !comment || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingReview = await Review.findOne({
      productId,
      userId,
    });
    if (existingReview) {
      existingReview.comment = comment;
      existingReview.rating = rating;
      await existingReview.save();
      return res.status(200).json(existingReview);
    } else {
      const newReview = new Review({ productId, userId, comment, rating });
      await newReview.save();
    }

    // calculate the average rating
    const reviews = await Review.find({ productId });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (acc, review) => acc + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;
      const product = await Product.findById(productId);
      if (product) product.rating = averageRating;
      await product.save({ validateModifiedOnly: true });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(201).json({
      success: true,
      message: "Review posted successfully",
      review: reviews,
    });
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all reviews for a product

export const totalReviews = async (req, res) => {
  // Get all reviews of all products
  try {
    const totalReviews = await Review.countDocuments({});
    res.status(200).json({ totalReviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get reviews by product ID
export const getReviewsByProductId = async (req, res) => {

  const { productId } = req.params;
  try {
    const reviews = await Review.find({ productId }).populate("userId", "name");
    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
