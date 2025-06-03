import { useAccorionCtx } from "./Accordion";
import { useIdCtx } from "./AccordionItem";

export default function AccordionContent({ children, className }) {
  const { itemID } = useAccorionCtx();
  const id = useIdCtx();
  const isOpen = itemID === id;

  return (
    <div
      className={
        isOpen ? `${className ?? ""} open` : `${className ?? ""} close`
      }
    >
      {children}
    </div>
  );
}
