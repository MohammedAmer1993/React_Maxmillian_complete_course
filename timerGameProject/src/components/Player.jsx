import { useState, useRef } from "react";

export default function Player() {
  const [player, setPlayer] = useState("Unkown Player");
  const playerName = useRef(null);

  function handleClick() {
    setPlayer(playerName.current.value);
    playerName.current.value = "";
  }

  return (
    <section id="player">
      <h2>Welcome {player}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
