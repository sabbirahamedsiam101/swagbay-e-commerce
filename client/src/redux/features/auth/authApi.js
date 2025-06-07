import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../../utlis/baseURL";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      refetchOnMount: true,
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      refetchOnMount: true,
      invalidatesTags: ["User"],
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: role,
      }),
      refetchOnMount: true,
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/users/edit/${id}`,
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
  useUpdateProfileMutation,
} = authApi;
export default authApi;
