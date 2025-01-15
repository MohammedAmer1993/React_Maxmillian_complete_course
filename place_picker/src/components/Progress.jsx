import { useState, useEffect } from "react";
export default function Progress({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 10);
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return <progress value={remainingTime} max={timer} />;
}
