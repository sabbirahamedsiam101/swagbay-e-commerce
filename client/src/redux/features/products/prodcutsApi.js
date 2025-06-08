import { createApi } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: ({
        category = "all",
        color = "all",
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
        sortBy = "newest",
      }) => {
        const queryParams = new URLSearchParams({
          category,
          color,
          minPrice,
          maxPrice,
          page,
          limit,
          sortBy,
        }).toString();
        return `/?${queryParams}`;
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