import Review from "../models/reviews.model.js";
import Product from "../models/products.model.js";

// Helper: Update average rating for product
async function updateProductAverageRating(productId) {
  const reviews = await Review.find({ productId, status: "active" });
  if (reviews.length === 0) {
    // No active reviews, reset rating to 0 or null
    await Product.findByIdAndUpdate(productId, { rating: 0 });
    return;
  }
  const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avgRating = totalRating / reviews.length;
  await Product.findByIdAndUpdate(productId, { rating: avgRating });
}

// Create or Update Review
export const postReview = async (req, res) => {
  const { productId, comment, rating } = req.body;
  const userId = req?.user?.id;

  if (!productId || !comment || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let review = await Review.findOne({ productId, userId });

    if (review) {
      // Update existing review
      review.comment = comment;
      review.rating = rating;
      review.status = "active"; // reset status if it was disabled/flagged
      await review.save();
    } else {
      // Create new review
      review = new Review({
        productId,
        userId,
        comment,
        rating,
        status: "active",
      });
      await review.save();
    }

    // Update average rating for the product
    await updateProductAverageRating(productId);

    res.status(200).json({
      success: true,
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    console.error("Error posting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all reviews count
// export const totalReviews = async (req, res) => {
//   try {
//     const totalReviews = await Review.countDocuments({ status: "active" });
//     res.status(200).json({ totalReviews });
//   } catch (error) {
//     console.error("Error fetching reviews count:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("productId", "name")
      .populate("userId", "name email"); // Add email if needed

    const totalReviews = reviews.length;

    res.status(200).json({
      success: true,
      totalReviews,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching all reviews for admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get reviews by product ID (only active and not deleted)
export const getReviewsByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({
      productId,
      status: "active",
    }).populate("userId", "name");

    if (!reviews || reviews.length === 0) {
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

// Soft delete a review by ID (admin only)
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.status = "deleted";
    await review.save();

    // Update product rating after deletion
    await updateProductAverageRating(review.productId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Bulk soft delete reviews by IDs (admin only)
export const bulkDeleteReviews = async (req, res) => {
  const { ids } = req.body; // destructure 'ids' from body

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "ids must be a non-empty array" });
  }

  try {
    // Fetch reviews before deleting to get related product IDs
    const reviewsToDelete = await Review.find({ _id: { $in: ids } });
    const productIds = [
      ...new Set(reviewsToDelete.map((r) => r.productId.toString())),
    ];

    // Delete reviews permanently
    const deleteResult = await Review.deleteMany({ _id: { $in: ids } });

    // Recalculate average rating for affected products
    await Promise.all(productIds.map(updateProductAverageRating));

    res.status(200).json({
      message: `Successfully deleted ${deleteResult.deletedCount} reviews.`,
    });
  } catch (error) {
    console.error("Error bulk deleting reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
