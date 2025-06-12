import { createContext, useState } from "react";

export const ProductsCtx = createContext({
  productList: [],
  favtoggle: (id) => {},
});

export default function CtxProvider({ children }) {
  const [productList, setProductList] = useState([
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ]);

  function favtoggle(id) {
    setProductList((prev) => {
      const prodIndex = prev.findIndex((p) => p.id === id);
      const newFavStatus = !prev[prodIndex].isFavorite;
      const updatedProducts = [...prev];
      updatedProducts[prodIndex] = {
        ...prev[prodIndex],
        isFavorite: newFavStatus,
      };
      return updatedProducts;
    });
  }
  const ctxVal = { productList, favtoggle };
  return <ProductsCtx.Provider value={ctxVal}>{children}</ProductsCtx.Provider>;
}
