import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utlis/baseURL";

const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    // Get reviews by product ID
    getReviewsByProductId: builder.query({
      query: (productId) => `/${productId}`,
      providesTags: ["Review"],
    }),

    // Post a review
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: "/post-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),

    // ✅ Get all reviews for admin
    getAllReviews: builder.query({
      query: () => "/admin/all-reviews",
      providesTags: ["Review"],
    }),

    // ✅ Update review status
    updateReviewStatus: builder.mutation({
      query: ({ reviewId, status }) => ({
        url: `/admin/update-status/${reviewId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Review"],
    }),

    // ✅ Delete single review
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/admin/delete/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),

    // ✅ Bulk delete reviews
    bulkDeleteReviews: builder.mutation({
      query: (ids) => ({
        url: `/admin/bulk-delete`,
        method: "POST",
        body: { ids }, // expects { ids: [...] }
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useGetReviewsByProductIdQuery,
  usePostReviewMutation,
  useGetAllReviewsQuery,
  useUpdateReviewStatusMutation,
  useDeleteReviewMutation, // ✅ This is what was missing
  useBulkDeleteReviewsMutation,
} = reviewsApi;

export default reviewsApi;
