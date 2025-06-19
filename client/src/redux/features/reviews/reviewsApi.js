// src/redux/features/reviews/reviewsApi.js
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
    // POST: Create or Update Review
    postReview: builder.mutation({
      query: (reviewData) => ({
        url: "/post-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Review", id: arg.productId },
      ],
    }),

    // GET: All reviews of a product
    getReviewsByProductId: builder.query({
      query: (productId) => `/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Review", id: productId },
      ],
    }),

    // GET: Total review count (site-wide)
    getTotalReviews: builder.query({
      query: () => "/total-reviews",
      providesTags: ["Review"],
    }),
  }),
});

export const {
  usePostReviewMutation,
  useGetReviewsByProductIdQuery,
  useGetTotalReviewsQuery,
} = reviewsApi;

export default reviewsApi;
