import { configureStore } from "@reduxjs/toolkit";
import cartUiReducer from "./cartUI-slice";
import cartReducer from "./cart-slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartUi: cartUiReducer,
  },
});

export default store;
