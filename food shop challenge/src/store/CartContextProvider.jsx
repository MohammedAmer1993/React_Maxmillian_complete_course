import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  delItem: () => {},
  clearItems: () => {},
});

function reducer(state, action) {
  const updatedItemList = [...state.items];
  const foundItem = state.items.findIndex(
    (element) => element.id === action.item?.id
  );
  if (action.type === "ADD") {
    if (foundItem >= 0) {
      updatedItemList[foundItem].quantity += 1;
    } else {
      action.item.quantity = 1;
      updatedItemList.push(action.item);
    }
  }

  if (action.type === "DEL") {
    if (foundItem >= 0) {
      updatedItemList[foundItem].quantity -= 1;
      if (updatedItemList[foundItem].quantity === 0) {
        updatedItemList.splice(foundItem, 1);
      }
    }
  }

  if (action.type === "CLEAR") {
    return { ...state, items: [] };
  }

  return { items: updatedItemList };
}

export default function CartContextProvider({ children }) {
  const [cartState, dispatch] = useReducer(reducer, { items: [] });

  function addItem(item) {
    dispatch({ type: "ADD", item: item });
  }
  function delItem(item) {
    dispatch({ type: "DEL", item: item });
  }
  function clearItems() {
    dispatch({ type: "CLEAR" });
  }

  const ctxVal = { cartState, addItem, delItem, clearItems };
  return <CartContext.Provider value={ctxVal}>{children}</CartContext.Provider>;
}
