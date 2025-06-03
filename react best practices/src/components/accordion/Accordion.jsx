import { createContext, useState, useContext } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

export const AccordionCtx = createContext({
  itemID: null,
  toggle(id) {},
});

export function useAccorionCtx() {
  const ctx = useContext(AccordionCtx);
  if (!ctx) {
    throw new Error("accordion context must be consumed by accordion elements");
  }
  return ctx;
}

export default function Accordion({ children, className }) {
  const [itemID, setItemID] = useState(null);

  function toggle(id) {
    setItemID((prev) => (prev === id ? null : id));
  }

  const ctxVal = {
    itemID,
    toggle,
  };
  return (
    <AccordionCtx.Provider value={ctxVal}>
      <ul className={className}>{children}</ul>
    </AccordionCtx.Provider>
  );
}

Accordion.item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
