import { useState } from "react";
import Header from "./components/Header";
import InputFields from "./components/InputFields";
import Results from "./components/Results";
const INITIAL_INPUT_VALUS = {
  initialInvestment: 1000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
};

function App() {
  const [inputs, setInputs] = useState(INITIAL_INPUT_VALUS);
  const isValid = inputs.duration >= 1;
  function handleChange(name, val) {
    setInputs((prevInputs) => {
      const newInputsObj = {
        ...prevInputs,
        [name]: +val,
      };
      return newInputsObj;
    });
  }
  return (
    <div>
      <Header />
      <InputFields onChange={handleChange} inputs={inputs} />
      {!isValid && (
        <p className="center">
          please enter valid value eg (duration must be greater than 0)
        </p>
      )}
      {isValid && <Results inputs={inputs} />}
    </div>
  );
}

export default App;
