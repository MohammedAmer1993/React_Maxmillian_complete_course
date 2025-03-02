import { useState } from "react";
export default function useInput(val, validationFn) {
  const [enteredVal, setEnteredVal] = useState(val);
  const [isEdited, setIsEdited] = useState(false);

  const invalidVal = isEdited && !validationFn(enteredVal);
  function handleChange(event) {
    setEnteredVal(event.target.value);
    setIsEdited(false);
  }
  function handleBlur() {
    setIsEdited(true);
  }

  function setInital() {
    setEnteredVal("");
    setIsEdited(false);
  }
  return { enteredVal, handleChange, handleBlur, invalidVal, setInital };
}
