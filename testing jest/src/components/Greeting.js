import { useState } from "react";

export default function Greeting() {
  const [state, setState] = useState(false);
  function handleClick() {
    setState(true);
  }
  return (
    <section>
      <h2>hello everyone</h2>
      <button onClick={handleClick}></button>
      {!state && <p>NOT clicked yet</p>}
      {state && <p>You have already clicked the button</p>}
    </section>
  );
}
