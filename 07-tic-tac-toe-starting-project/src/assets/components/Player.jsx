import { useState } from "react";

export default function Player({ name, symbol, isActive, ...props }) {
  const [isEditing, setisEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  function handleEditClick() {
    setisEditing((editState) => !editState);
  }
  function handleInputChange(event) {
    setPlayerName(event.target.value);
  }

  let initialPlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    initialPlayerName = (
      <input
        onChange={handleInputChange}
        type="text"
        required
        value={playerName}
      />
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {initialPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "save" : "Edit"}</button>
    </li>
  );
}
