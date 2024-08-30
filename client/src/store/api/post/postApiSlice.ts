import { apiSlice } from "../apiSlice.js";

const API_ENDPOINTS: string = "/posts";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPostApi: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS}/add-posts`,
        method: "POST",
        body: data,
      }),
    }),
    getPostApi: builder.query({
      query: () => ({
        url: `${API_ENDPOINTS}/get-posts`,
        method: "GET",
      }),
    }),
    getSinglePostApi: builder.query({
      query: (id) => ({
        url: `${API_ENDPOINTS}/single-post/${id}`,
        method: "GET",
      }),
    }),
    sendProposalApi: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS}/send-proposal/${id}`,
        method: "POST",
      }),
    }),
    getProposalApi: builder.query({
      query: () => ({
        url: `${API_ENDPOINTS}/get-proposal`,
        method: "GET",
      }),
    }),
    getPostByUserId: builder.query({
      query: () => ({
        url: `${API_ENDPOINTS}/get-user-posts`,
        method: "GET",
      }),
    }),
    getProposalById: builder.query({
      query: (id) => ({
        url: `${API_ENDPOINTS}/get-user-proposals/${id}`,
      }),
    }),
    getUserDetailsByIdApi: builder.query({
      query: (id) => ({
        url: `${API_ENDPOINTS}/get-user-details/${id}`,
        method: "GET",
      }),
    }),
    deletePostApi: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS}/delete-post/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePostApiMutation,
  useGetPostApiQuery,
  useGetSinglePostApiQuery,
  useSendProposalApiMutation,
  useGetProposalApiQuery,
  useGetPostByUserIdQuery,
  useGetProposalByIdQuery,
  useGetUserDetailsByIdApiQuery,
  useDeletePostApiMutation,
} = postApiSlice;
