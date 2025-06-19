import { useState } from "react";
import {
  useGetAllReviewsQuery,
  useDeleteReviewMutation,
  useBulkDeleteReviewsMutation,
  useUpdateReviewStatusMutation,
} from "../../../redux/features/reviews/reviewsApi";
import RatingStars from "../../../Components/RatingStars";
import Loading from "../../../Components/Loading";

export default function ManageReviews() {
  const { data, isLoading, refetch } = useGetAllReviewsQuery();
  const reviews = data?.reviews || [];
  const [deleteReview, { isLoading: deleting }] = useDeleteReviewMutation();
  const [bulkDeleteReviews, { isLoading: bulkDeleting }] = useBulkDeleteReviewsMutation();
  const [updateStatus, { isLoading: updating }] = useUpdateReviewStatusMutation();

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(reviews.map((r) => r._id));
    }
    setSelectAll(!selectAll);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to permanently delete this review?")) {
      await deleteReview(id);
      refetch();
      setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (confirm("Permanently delete selected reviews?")) {
      await bulkDeleteReviews(selectedIds); // pass array directly
      setSelectedIds([]);
      setSelectAll(false);
      refetch();
    }
  };

  const handleStatusChange = async (reviewId, newStatus) => {
    await updateStatus({ reviewId, status: newStatus }); // fixed key
    refetch();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Review Management</h2>

      <button
        onClick={handleBulkDelete}
        disabled={bulkDeleting || selectedIds.length === 0}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {bulkDeleting ? "Deleting..." : "Delete Selected"}
      </button>

      <div className="overflow-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-2">
                <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
              </th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-left">Comment</th>
              <th className="p-2 text-left">Rating</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-t">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(review._id)}
                    onChange={() => toggleSelect(review._id)}
                  />
                </td>
                <td className="p-2">{review.userId?.name || "Anonymous"}</td>
                <td className="p-2 max-w-sm truncate">{review.productId?.name || "N/A"}</td>
                <td className="p-2 max-w-sm truncate">{review.comment}</td>
                <td className="p-2">
                  <RatingStars rating={review.rating} />
                </td>
                <td className="p-2">
                  <select
                    disabled={updating}
                    value={review.status}
                    onChange={(e) => handleStatusChange(review._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                    <option value="flagged">Flagged</option>
                    <option value="deleted">Deleted</option>
                  </select>
                </td>
                <td className="p-2">
                  <button
                    disabled={deleting}
                    onClick={() => handleDelete(review._id)}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
