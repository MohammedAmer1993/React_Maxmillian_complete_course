import investImg from "../assets/investment-calculator-logo.png";
export default function Header({ ...props }) {
  return (
    <header id="header">
      <img src={investImg} alt="investment image some gold" />
      <h1>Investment Calculator</h1>
    </header>
  );
}
