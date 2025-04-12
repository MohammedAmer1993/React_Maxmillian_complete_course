import { createContext, useState } from "react";

export const ProgressContext = createContext({
  cartProgress: "cart",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export default function ProgressContextProvider({ children }) {
  const [progressState, setProgressState] = useState("");
  function showCart() {
    setProgressState("cart");
  }
  function hideCart() {
    setProgressState("");
  }
  function showCheckout() {
    setProgressState("checkout");
  }
  function hideCheckout() {
    setProgressState("");
  }

  const progressCtx = {
    cartProgress: progressState,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };
  return (
    <ProgressContext.Provider value={progressCtx}>
      {children}
    </ProgressContext.Provider>
  );
}
