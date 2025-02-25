import { createContext } from "react";

export const MyContext = createContext([]);

export default function MyContextPro({ children }) {
  const contextVal = {
    users: [
      { id: "u1", name: "Max" },
      { id: "u2", name: "Manuel" },
      { id: "u3", name: "Julie" },
    ],
  };
  return <MyContext.Provider value={contextVal}>{children}</MyContext.Provider>;
}
