import { createSlice } from "@reduxjs/toolkit";
const counterIntial = { count: 0, show: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: counterIntial,
  reducers: {
    increament(state) {
      state.count++;
    },
    decreament(state) {
      state.count--;
    },
    increase(state, action) {
      state.count = state.count + action.payload;
    },
    Toggle(state) {
      state.show = !state.show;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
