
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utlis/baseURL";

const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/categories`,
    credentials: "include",
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // Get all categories
    fetchAllCategories: builder.query({
      query: () => "/",
      providesTags: ["Category"],
    }),

    // Get a single category
    fetchCategoryById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),

    // Create a category
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/create-category",
        method: "POST",
        body: newCategory,
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),

    // Update a category
    updateCategory: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-category/${id}`,
        method: "PUT",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),

    // Delete a category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/delete-category/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useFetchAllCategoriesQuery,
  useFetchCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export default categoryApi;
