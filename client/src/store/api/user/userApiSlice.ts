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
    getUserProfileByIdApi: builder.query({
      query: (id) => ({
        url: `${USER_ENDPOINTS}/user-details/${id}`,
        method: "GET",
      }),
    }),
    getProfileById: builder.query({
      query: (id) => ({
        url: `${USER_ENDPOINTS}/get-profile/${id}`,
        method: "GET",
      }),
    }),

    // Adding the update profile mutation
    updateUserProfileApi: builder.mutation({
      query: (formData: unknown) => ({
        url: `${USER_ENDPOINTS}/update-profile`, // The API endpoint for updating the profile
        method: "PUT", // Assuming you're using PUT for updates
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateUserProfileApiMutation,
  useGetUserProfileApiQuery,
  useGetUserProfileByIdApiQuery,
  useGetProfileByIdQuery,
  useUpdateUserProfileApiMutation, // Export the update profile mutation hook
} = userApiSlice;

export default userApiSlice.reducer;
