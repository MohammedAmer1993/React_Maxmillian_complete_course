import { forwardRef } from "react";
const Input = forwardRef(
  ({ label, isTextArea, validInputs, ...props }, ref) => {
    const inputClasses =
      "w-full p-1 bord-b-8  rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    return (
      <>
        <p className="flex flex-col gap-1 my-4">
          <label className="text-sm font-bold uppercase text-stone-500">
            {label}
          </label>
          {isTextArea ? (
            <textarea ref={ref} className={inputClasses} {...props}></textarea>
          ) : (
            <input ref={ref} className={inputClasses} {...props} />
          )}
        </p>
        {validInputs[label] === false ? (
          <p className="text-red-500 text-sm mt-1">this field is required</p>
        ) : (
          ""
        )}
      </>
    );
  }
);

export default Input;
