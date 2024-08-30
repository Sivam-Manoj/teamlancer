import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  userData: Record<string, unknown> | null;
  isLoggedIn: boolean;
  userLoginId: string | null;
}

const getUserData = (): Record<string, unknown> | null => {
  const userData = sessionStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

const getUserLoginId = (
  data: Record<string, unknown> | null
): string | null => {
  return data && data._id ? (data._id as string) : null;
};

const initialState: User = {
  userData: getUserData(),
  isLoggedIn: !!getUserData(),
  userLoginId: getUserLoginId(getUserData()),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ user: Record<string, unknown> }>
    ) => {
      state.userData = action.payload.user;
      sessionStorage.setItem("userData", JSON.stringify(action.payload.user));
      state.isLoggedIn = true;
      state.userLoginId = action.payload.user._id
        ? (action.payload.user._id as string)
        : null;
    },

    logout: (state) => {
      state.userData = null;
      sessionStorage.removeItem("userData");
      state.isLoggedIn = false;
      state.userLoginId = null;
    },
  },
});

// Export the actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
