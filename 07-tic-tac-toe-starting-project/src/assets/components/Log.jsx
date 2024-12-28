export default function Log({ turnsLog }) {
  return (
    <ol id="log">
      {turnsLog.map((item) => (
        <li key={`row: ${item.coordinate.row}, col: ${item.coordinate.col}`}>
          Player: {item.player} Selected row {item.coordinate.row}, column
          {" " + item.coordinate.col}
        </li>
      ))}
    </ol>
  );
}
