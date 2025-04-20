import { createSlice } from "@reduxjs/toolkit";

const cartUiInitial = { isVisable: false, notification: null };
const cartUiSlice = createSlice({
  name: "cartUi",
  initialState: cartUiInitial,
  reducers: {
    toggle(state) {
      state.isVisable = !state.isVisable;
    },
    updateNotification(state, action) {
      if (!action.payload) {
        state.notification = null;
      } else {
        state.notification = {
          status: action.payload.status,
          title: action.payload.title,
          message: action.payload.message,
        };
      }
    },
  },
});

export default cartUiSlice.reducer;
export const cartUiActions = cartUiSlice.actions;
