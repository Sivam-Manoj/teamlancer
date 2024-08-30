import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://16.171.199.13:3000",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: () => ({}),
});
