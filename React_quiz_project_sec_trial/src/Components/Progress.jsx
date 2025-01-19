import { useState, useEffect } from "react";
export default function Progress({ time }) {
  const [remainingTime, setReaminingTime] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => {
      setReaminingTime((prev) => prev - 10);
    }, 10);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <progress id="question-time" value={remainingTime} max={time} />;
}
