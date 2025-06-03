import { useAccorionCtx } from "./Accordion";
import { useIdCtx } from "./AccordionItem";

export default function AccordionTitle({ children, className }) {
  const { toggle } = useAccorionCtx();
  const id = useIdCtx();

  return (
    <h2 className={className} onClick={() => toggle(id)}>
      {children}
    </h2>
  );
}
