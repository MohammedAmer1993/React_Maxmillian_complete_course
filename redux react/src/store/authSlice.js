import { createSlice } from "@reduxjs/toolkit";

const authInitial = { isLogged: false };

const authSlice = createSlice({
  name: "auth",
  initialState: authInitial,
  reducers: {
    logIn(state) {
      state.isLogged = true;
    },
    logOut(state) {
      state.isLogged = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
