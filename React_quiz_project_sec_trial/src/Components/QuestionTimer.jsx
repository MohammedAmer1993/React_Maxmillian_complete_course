import { useEffect } from "react";
import Progress from "./Progress";
export default function QustionTimer({ time, onTimeout }) {
  useEffect(() => {
    const timer = setTimeout(onTimeout, time);
    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, time]);

  return <Progress time={time} />;
}
