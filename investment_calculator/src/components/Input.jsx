export default function Input({ onChange, inputs, name, ...props }) {
  let labelVal;
  switch (name) {
    case "initialInvestment":
      labelVal = "Initial Investment";
      break;
    case "annualInvestment":
      labelVal = "Annual Investment";
      break;
    case "expectedReturn":
      labelVal = "Expected Return";
      break;
    case "duration":
      labelVal = "Duration";
    default:
      break;
  }

  return (
    <p>
      <label>{labelVal}</label>
      <input
        onChange={(event) => onChange(name, event.target.value)}
        value={inputs[name]}
        {...props}
      />
    </p>
  );
}
