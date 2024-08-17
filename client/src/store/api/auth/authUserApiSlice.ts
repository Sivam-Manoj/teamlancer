import { apiSlice } from "../apiSlice";

const USER_ENDPOINTS: string = "/user";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: ({ email, password }) => ({
        url: `${USER_ENDPOINTS}/login`,
        method: "POST",
        body: { email, password },
      }),
    }),
    resgisterUserApi: builder.mutation({
      query: ({ name, email, mobile, password }) => ({
        url: `${USER_ENDPOINTS}/register`,
        method: "POST",
        body: { name, email, mobile, password },
      }),
    }),
  }),
});

export const { useLoginApiMutation, useResgisterUserApiMutation } =
  userApiSlice;
export default userApiSlice.reducer;
