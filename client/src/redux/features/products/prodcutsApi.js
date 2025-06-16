import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utlis/baseURL";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: (params) => {
        const {
          category = "all",
          color = "all",
          minPrice,
          maxPrice,
          page = 1,
          limit = 10,
          sortBy = "newest",
          isFeatured = false,
        } = params;

        const queryParams = new URLSearchParams();

        if (category) queryParams.set("category", category);
        if (color) queryParams.set("color", color);
        if (minPrice !== undefined && minPrice !== "")
          queryParams.set("minPrice", minPrice);
        if (maxPrice !== undefined && maxPrice !== "")
          queryParams.set("maxPrice", maxPrice);

        queryParams.set("page", page);
        queryParams.set("limit", limit);
        queryParams.set("sortBy", sortBy);
        queryParams.set("isFeatured", isFeatured);
        console.log("Query values:", { category, color, minPrice, maxPrice });

        return `/?${queryParams.toString()}`;
      },
      providesTags: ["Product"],
    }),

    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/create-product",
        method: "POST",
        body: newProduct,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    fetchRelatedProducts: builder.query({
      query: (id) => `/related/${id}`,
      //   providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-product/${id}`,
        method: "PUT",
        body: rest,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useFetchRelatedProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;

export default productsApi;
