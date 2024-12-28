import Input from "./Input";
export default function InputFields({ onChange, inputs }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <Input
          onChange={onChange}
          inputs={inputs}
          type="number"
          name="initialInvestment"
          required
        />
        <Input
          onChange={onChange}
          inputs={inputs}
          type="number"
          name="annualInvestment"
          required
        />
      </div>
      <div className="input-group">
        <Input
          onChange={onChange}
          inputs={inputs}
          type="number"
          name="expectedReturn"
          required
        />
        <Input
          onChange={onChange}
          inputs={inputs}
          type="number"
          name="duration"
          required
        />
      </div>
    </section>
  );
}
