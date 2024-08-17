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
  }),
});

export const {
  useCreatePostApiMutation,
  useGetPostApiQuery,
  useGetSinglePostApiQuery,
} = postApiSlice;
