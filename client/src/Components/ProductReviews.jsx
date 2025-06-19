import { useState } from "react";
import RatingStars from "./RatingStars";
import {
  useGetReviewsByProductIdQuery,
  usePostReviewMutation,
} from "../../src/redux/features/reviews/reviewsApi.js";

export default function ProductReviews({ productId }) {
  const { data: reviews = [], isLoading: isReviewsLoading } =
    useGetReviewsByProductIdQuery(productId);
  const [postReview, { isLoading: isPosting }] = usePostReviewMutation();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await postReview({ productId, comment, rating }).unwrap();
      setComment("");
      setRating(5);
    } catch (err) {
      console.error("Failed to post review:", err);
    }
  };
  console.log("product revies", reviews);

  return (
    <section className="section__container bg-gray-100 py-10 rounded mt-10">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-6 text-center">
          Customer Reviews
        </h3>

        {/* Review Form */}
        <form
          onSubmit={handleReviewSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 rounded border border-gray-300"
            rows={3}
            placeholder="Write your review..."
            required
          />

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Rating:</label>
            <select
              value={rating}
              onChange={(e) => {
                const newRating = Number(e.target.value);
                console.log("Selected rating:", newRating);
                setRating(newRating);
              }}
              className="border rounded px-3 py-1"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 && "s"}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isPosting}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            {isPosting ? "Posting..." : "Submit Review"}
          </button>
        </form>

        {/* Display Reviews */}
        <div className="mt-10 space-y-4">
          {isReviewsLoading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-600 text-center">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white p-4 rounded shadow flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-800">
                    {review.userId?.name || "Anonymous"}
                  </h4>
                  <RatingStars rating={review.rating} />
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
