import { createSlice } from "@reduxjs/toolkit";
import { cartUiActions } from "./cartUI-slice";

const cartInitial = { items: [], totalQuantitny: 0, change: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitial,
  reducers: {
    addToCart(state, action) {
      state.totalQuantitny++;
      state.change = true;
      const newItem = action.payload;
      const index = state.items.findIndex((item) => item.id === newItem.id);
      if (index < 0) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
        });
      } else {
        state.items[index].quantity += 1;
      }
    },

    removeFromCart(state, action) {
      state.totalQuantitny--;
      state.change = true;
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        if (state.items[index].quantity === 1) {
          state.items.splice(index, 1);
        } else {
          state.items[index].quantity -= 1;
        }
      }
    },
    replaceState(state, action) {
      state.items = action.payload.items || [];
      state.totalQuantitny = action.payload.totalQuantitny || 0;
    },
  },
});

export function putActionGen(cart) {
  return async (dispatch) => {
    dispatch(
      cartUiActions.updateNotification({
        status: "pending",
        title: "Pending...",
        message: "Data is being sent",
      })
    );
    fetch("https://async-with-max-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify({
        items: cart.items,
        totalQuantitny: cart.totalQuantitny,
      }),
    })
      .then((req) => {
        if (!req.ok) {
          throw new Error("failed to post data to backend");
        }
        dispatch(
          cartUiActions.updateNotification({
            status: "success",
            title: "Success",
            message: "Data sent successfully",
          })
        );
      })
      .catch((err) =>
        dispatch(
          cartUiActions.updateNotification({
            status: "error",
            title: "Error!",
            message: err.message,
          })
        )
      );
  };
}

export function getActionGen() {
  return async (dispatch) => {
    fetch("https://async-with-max-default-rtdb.firebaseio.com/cart.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("couldn't fetch data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(cartActions.replaceState(data));
        console.log("there");
      })
      .catch((err) =>
        dispatch(
          cartUiActions.updateNotification({
            status: "error",
            title: "Error!",
            message: err.message,
          })
        )
      );
  };
}

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
