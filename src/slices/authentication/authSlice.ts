import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  userTypeId: string;
  userTypeName: string;
  invalidLogin: string;
}

const authState: AuthState = {
  isLoading: false,
  isLoggedIn: false,
  userTypeId: "",
  userTypeName: "",
  invalidLogin: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    tryUserLogin: (state, action) => {
      state.isLoading = true;
    },
    tryPasswordReset: (state, action) => {
      state.isLoading = true;
    },
    setUser: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userTypeId = action.payload.role_id;
      state.userTypeName = action.payload.role_name;
      state.invalidLogin = "";
    },
    setInvalidLogin: (state, action) => {
      console.log("action", action.payload);
      state.invalidLogin = action.payload;
    },
    tryUserLogOut: (state, action) => {
      state.isLoggedIn = false;
      state.invalidLogin = "";
    },
  },
});

export const {
  tryUserLogin,
  setUser,
  tryUserLogOut,
  setInvalidLogin,
  tryPasswordReset,
} = authSlice.actions;

export default authSlice.reducer;
