import { useState, useCallback, useMemo, memo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import CounterHistory from "./CounterHistory.jsx";
import { log } from "../../log.js";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter = memo(function ({ initialCount }) {
  log("<Counter /> rendered", 1);
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  const [counterChange, setCounterChange] = useState([
    { value: initialCount, id: Math.random() * 1000 },
  ]);

  const handleDecrement = useCallback(function () {
    setCounterChange((prevCounter) => [
      { value: -1, id: Math.random() * 1000 },
      ...prevCounter,
    ]);
  }, []);

  const handleIncrement = useCallback(function () {
    setCounterChange((prevCounter) => [
      { value: 1, id: Math.random() * 1000 },
      ...prevCounter,
    ]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput
          value={counterChange.reduce((prev, curr) => prev + curr.value, 0)}
        />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChange} />
    </section>
  );
});

export default Counter;
