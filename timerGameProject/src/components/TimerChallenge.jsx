import { useState, useRef } from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timer = useRef();
  const dialog = useRef();
  const isActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    dialog.current.open();
    clearInterval(timer.current);
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }
  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prev) => prev - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        result={timeRemaining}
        targetTime={targetTime}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          {isActive ? (
            <button onClick={handleStop}>Stop Timer</button>
          ) : (
            <button onClick={handleStart}>Start challenge</button>
          )}
        </p>
        <p className={isActive ? "active" : undefined}>
          {isActive ? "timer is running ..." : "timer is off"}
        </p>
      </section>
    </>
  );
}
