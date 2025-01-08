import { useRef, useState } from "react";
import Input from "./Input";
export default function NewProject({ onCancel, onAdd }) {
  const [validInputs, setValidInputs] = useState({
    Title: true,
    Description: true,
    "Due Date": true,
  });

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  function handleSave() {
    const projectItem = {};
    projectItem.title = title.current.value;
    projectItem.description = description.current.value;
    projectItem.dueDate = dueDate.current.value;
    projectItem.tasks = [];
    setValidInputs({
      ...validInputs,
      Title: projectItem.title.trim() === "" ? false : true,
      Description: projectItem.description.trim() === "" ? false : true,
      "Due Date": projectItem.dueDate.trim() === "" ? false : true,
    });
    if (
      projectItem.title.trim() !== "" &&
      projectItem.description.trim() !== "" &&
      projectItem.dueDate.trim() !== ""
    ) {
      onAdd(projectItem);
    }
  }
  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button
            onClick={onCancel}
            className="text-stone-800 hover:text-stone-950"
          >
            Cancel
          </button>
        </li>
        <li>
          <button
            onClick={handleSave}
            className=" px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            Save
          </button>
        </li>
      </menu>
      <div>
        <Input
          type="text"
          label="Title"
          ref={title}
          validInputs={validInputs}
        />
        <Input
          type="text"
          label="Description"
          isTextArea
          ref={description}
          validInputs={validInputs}
        />
        <Input
          type="date"
          label="Due Date"
          ref={dueDate}
          validInputs={validInputs}
        />
      </div>
    </div>
  );
}
