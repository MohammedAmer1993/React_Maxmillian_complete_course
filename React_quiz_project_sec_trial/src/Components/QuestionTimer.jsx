import { useEffect, useState } from "react";
export default function QustionTimer({ time, onTimeout }) {
  const [remainingTime, setReaminingTime] = useState(time);
  useEffect(() => {
    const timer = setTimeout(onTimeout, time);
    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, time]);

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
