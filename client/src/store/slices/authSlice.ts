import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  userData: unknown;
  isLoggedIn: boolean;
}

const getUserData = (): unknown | null => {
  const userData = sessionStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

const initialState: User = {
  userData: getUserData(),
  isLoggedIn: !!getUserData(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<unknown>) => {
      state.userData = action.payload;
      sessionStorage.setItem("userData", JSON.stringify(action.payload));
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.userData = null;
      sessionStorage.removeItem("userData");
      state.isLoggedIn = false;
    },
  },
});

// Export the actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
