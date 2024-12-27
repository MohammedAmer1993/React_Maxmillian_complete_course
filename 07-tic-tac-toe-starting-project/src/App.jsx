import { useState } from "react";
import Player from "./assets/components/Player";
import GameBoard from "./assets/components/GameBoard";
import Log from "./assets/components/Log";
function App() {
  const [turns, setTurns] = useState([]);

  const [playerSymbol, setPlayerSymbol] = useState("X");

  function onSelectAddLog(sym, row, col) {
    setTurns((prevState) => {
      const logObj = { player: sym, coordinate: { row: row, col: col } };
      const newState = [...prevState];
      newState.push(logObj);
      return newState;
    });
  }
  function onSelectSym() {
    setPlayerSymbol((prevSymb) => (prevSymb === "X" ? "O" : "X"));
  }
  console.log(turns);
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="player1"
            symbol="X"
            isActive={playerSymbol === "X" ? true : false}
          />
          <Player
            name="player2"
            symbol="O"
            isActive={playerSymbol === "O" ? true : false}
          />
        </ol>
        <GameBoard
          onSelect={onSelectSym}
          symbol={playerSymbol}
          onAddLog={onSelectAddLog}
        />
      </div>
      <Log turns={turns} />
    </main>
  );
}
export default App;
