import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import CounterConfigure from "./components/Counter/CounterConfigure.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);
  function handleChose(num) {
    setChosenCount(num);
  }

  return (
    <>
      <Header />
      <main>
        <CounterConfigure handleChosenCount={handleChose} />
        <Counter key={chosenCount} initialCount={chosenCount} />

        <Counter
          key={chosenCount * 2 === 0 ? 3 : chosenCount * 2}
          initialCount={chosenCount}
        />
      </main>
    </>
  );
}

export default App;
