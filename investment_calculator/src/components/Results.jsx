import { calculateInvestmentResults, formatter } from "../util/investment";
export default function Results({ inputs }) {
  const results = calculateInvestmentResults(inputs);
  console.log(inputs);
  const initialInvestment =
    results[0].valueEndOfYear -
    results[0].interest -
    results[0].annualInvestment;
  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (year)</th>
          <th>Total interest</th>
          <th>Invested capital</th>
        </tr>
      </thead>
      <tbody>
        {results.map((yearInvest) => {
          const totalIntrest =
            yearInvest.valueEndOfYear -
            yearInvest.annualInvestment * yearInvest.year -
            initialInvestment;
          const totalAmountInvested = yearInvest.valueEndOfYear - totalIntrest;

          return (
            <tr key={yearInvest.year}>
              <td>{yearInvest.year}</td>
              <td>{formatter.format(yearInvest.valueEndOfYear)}</td>
              <td>{formatter.format(yearInvest.interest)}</td>
              <td>{formatter.format(totalIntrest)}</td>
              <td>{formatter.format(totalAmountInvested)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
