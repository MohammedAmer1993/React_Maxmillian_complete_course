import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const show = useSelector((state) => state.counter.show);
  const dispatch = useDispatch();

  const toggleCounterHandler = () => {
    dispatch(counterActions.Toggle());
  };

  function handleIncrement() {
    dispatch(counterActions.increament());
  }
  function handleDecrement() {
    dispatch(counterActions.decreament());
  }

  function handleIncrease() {
    dispatch(counterActions.increase(5));
  }
  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{count}</div>}
      <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleIncrease}>incresa by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
