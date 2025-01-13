import { createContext, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
});

function reducer(state, action) {
  if (action.type === "ADD") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      updatedItems.push({
        id: action.payload,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }
    return {
      items: updatedItems,
    };
  }
  if (action.type === "UPDATE") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(reducer, {
    items: [],
  });

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: "ADD",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: "UPDATE",
      productId: productId,
      amount: amount,
    });
  }

  return (
    <CartContext.Provider
      value={{
        items: shoppingCartState.items,
        onAddToCart: handleAddItemToCart,
        onUpdateCartItemQuantity: handleUpdateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
