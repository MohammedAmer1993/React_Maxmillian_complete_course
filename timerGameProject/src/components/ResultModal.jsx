import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(({ result, targetTime, onReset }, ref) => {
  const isWinner = result > 0 ? "won" : "lost";
  const formatted = (result / 1000).toFixed(2);
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog className="result-modal" ref={dialogRef} onClose={onReset}>
      <h2>
        YOU <strong>{isWinner}</strong>
      </h2>
      <p>your target time was {targetTime} </p>
      <p>
        you stopped timer with <strong> {formatted} </strong>second
        {targetTime > 1 ? "s" : ""} left
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});
export default ResultModal;
