import { useState } from "react";
const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard({ symbol, onSelect, onAddLog }) {
  const [gameBoard, setGameBoard] = useState(initialBoard);
  function handleClick(row, col) {
    setGameBoard((previosBoard) => {
      const newBoard = previosBoard.map((innerArr) => [...innerArr]);
      newBoard[row][col] = symbol;
      return newBoard;
    });
    onAddLog(symbol, row, col);
    onSelect();
  }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((playSym, colIdx) => (
              <li key={colIdx}>
                <button onClick={() => handleClick(rowIdx, colIdx)}>
                  {playSym}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
