import { useState } from "react";

export default function GameBoard({ onSelect, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((playSym, colIdx) => (
              <li key={colIdx}>
                <button
                  onClick={() => {
                    if (board[rowIdx][colIdx] === null) {
                      onSelect(rowIdx, colIdx);
                    }
                  }}
                >
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
