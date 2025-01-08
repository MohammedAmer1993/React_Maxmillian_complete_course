import { useState } from "react";
export default function NewTask({ onAddTask }) {
  const [enteredVal, setEnteredVal] = useState("");
  function handleInput(event) {
    setEnteredVal(event.target.value);
  }

  function handleAdd() {
    if (enteredVal.trim() === "") {
      return;
    }
    onAddTask(enteredVal);
    setEnteredVal("");
  }
  return (
    <div className="flex items-center gap-4">
      <input
        onChange={handleInput}
        value={enteredVal}
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        onClick={handleAdd}
        className="text-stone-700 hover:text-stone-950"
      >
        Add Task
      </button>
    </div>
  );
}
