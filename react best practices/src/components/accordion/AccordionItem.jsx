import { createContext, useContext } from "react";

const idCtx = createContext();

export function useIdCtx() {
  const ctx = useContext(idCtx);
  if (!ctx) {
    throw new Error("id context must be consumed inside accordion item elemnt");
  }
  return ctx;
}
export default function AccordionItem({ id, children, className }) {
  return (
    <idCtx.Provider value={id}>
      <li className={className}>{children}</li>
    </idCtx.Provider>
  );
}
