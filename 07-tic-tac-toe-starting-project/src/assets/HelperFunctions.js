import { INITIAL_BOARD, WINNING_COMPINATION } from "./WinningCompination";

export function getSym(turnsArr) {
  let playerSymbol = "X";
  if (turnsArr.length > 0 && turnsArr[0].player === "X") {
    playerSymbol = "O";
  }
  return playerSymbol;
}

export function buildGameBoard(turns) {
  const gameBoard = INITIAL_BOARD.map((item) => [...item]);
  for (const item of turns) {
    const { player, coordinate } = item;
    gameBoard[coordinate.row][coordinate.col] = player;
  }
  return gameBoard;
}

export function caculateWinner(gameBoard) {
  for (const comp of WINNING_COMPINATION) {
    const first = gameBoard[comp[0].row][comp[0].col];
    const second = gameBoard[comp[1].row][comp[1].col];
    const third = gameBoard[comp[2].row][comp[2].col];
    if (first && first === second && first === third) {
      return first;
    }
  }
}
