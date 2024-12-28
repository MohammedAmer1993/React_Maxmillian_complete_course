import { useState } from "react";
/* COMPONENTS */
import Player from "./assets/components/Player";
import GameBoard from "./assets/components/GameBoard";
import Log from "./assets/components/Log";
import GameOver from "./assets/components/GameOver";
/* CONSTANTS */
import { PLAYERS } from "./assets/WinningCompination";

/* FUNCTIONS */
import {
  getSym,
  caculateWinner,
  buildGameBoard,
} from "./assets/HelperFunctions";

function App() {
  const [turns, setTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const gameBoard = buildGameBoard(turns);
  const winner = caculateWinner(gameBoard);
  let playerSymbol = getSym(turns);
  let isDraw = turns.length === 9 && !winner;

  function handleOnSelect(row, col) {
    setTurns((prevState) => {
      let playerSym = getSym(prevState);
      const newState = [
        { player: playerSym, coordinate: { row: row, col: col } },
        ...prevState,
      ];
      return newState;
    });
  }

  function handleRestart() {
    setTurns([]);
  }

  function handlePlayerNames(sym, player) {
    setPlayers((prevState) => {
      const newPlayersStateObj = {
        ...prevState,
        [sym]: player,
      };
      return newPlayersStateObj;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={playerSymbol === "X" ? true : false}
            onRename={handlePlayerNames}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={playerSymbol === "O" ? true : false}
            onRename={handlePlayerNames}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver onRestart={handleRestart} winner={players[winner]} />
        )}
        <GameBoard onSelect={handleOnSelect} board={gameBoard} />
      </div>
      <Log turnsLog={turns} />
    </main>
  );
}
export default App;
