import { apiSlice } from "../apiSlice";

const USER_ENDPOINTS: string = "/profile";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUserProfileApi: builder.mutation({
      query: (formData: unknown) => ({
        url: `${USER_ENDPOINTS}/create-profile`,
        method: "POST",
        body: formData,
      }),
    }),
    getUserProfileApi: builder.query({
      query: () => ({
        url: `${USER_ENDPOINTS}/user-profile`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateUserProfileApiMutation, useGetUserProfileApiQuery } =
  userApiSlice;
export default userApiSlice.reducer;
