import Results from "components/Calculator/Results";
import React from "react";
import { formatMoney } from "lib/formatMoney";
import { toFixedDecimal } from "lib/toFixedDecimal";
import { useEventTargetHandler } from "hooks/useEventTargetHandler";
import { useTaxBreakdown } from "hooks/useTaxBreakdown";

const allFederalBrackets = {
  single: [
    [0, 0.1],
    [9_950, 0.12],
    [40_525, 0.22],
    [86_375, 0.24],
    [164_925, 0.32],
    [209_426, 0.35],
    [523_601, 0.37],
  ],
  joint: [],
  head: [],
};

const allStateBrackets = {
  co: [[0, 0.0495]],
  il: [[0, 0.0495]],
  in: [[0, 0.0323]],
  ky: [[0, 0.05]],
  ma: [[0, 0.05]],
  mi: [[0, 0.0425]],
  nh: [[0, 0.05]],
  nc: [[0, 0.0525]],
  pa: [[0, 0.0307]],
  ut: [[0, 0.0425]],
};

const states = Object.keys(allStateBrackets);

export const Calculator = () => {
  const [income, setIncome] = React.useState<number>(0);
  const updateIncome = useEventTargetHandler(setIncome);
  const [selectedState, setSelectedState] = React.useState(states[0]);
  const updateState = useEventTargetHandler(setSelectedState);

  const federalBrackets = allFederalBrackets.single;
  const stateBrackets = allStateBrackets[selectedState];

  const {
    breakdown: federalBreakdown,
    total: federalTotal,
    percent: federalPercent,
  } = useTaxBreakdown(income, federalBrackets);

  const {
    breakdown: stateBreakdown,
    total: stateTotal,
    percent: statePercent,
  } = useTaxBreakdown(income, stateBrackets);

  return (
    <div className="grid gap-y-8 py-8 px-12">
      <form className="grid gap-x-4 grid-flow-col">
        <label className="grid gap-y-2">
          <span>Taxable Income</span>
          <input type="number" value={income || ""} onChange={updateIncome} />
        </label>
        <label className="grid gap-y-2">
          <span>State</span>
          <select onChange={updateState}>
            {states
              .sort((a, b) => (a < b ? -1 : 1))
              .map((state) => (
                <option value={state} selected={selectedState === state}>
                  {state.toUpperCase()}
                </option>
              ))}
          </select>
        </label>
      </form>
      <Results
        income={income}
        title="Combined"
        percent={statePercent + federalPercent}
        total={stateTotal + federalTotal}
      />
      <section className="breakdown-container">
        <h2>Federal</h2>
        <table className="breakdown">
          <thead>
            <tr className="breakdown-item">
              <th>Taxed Amount</th>
              <th>Tax Percent</th>
              <th>Taxes</th>
            </tr>
          </thead>
          <tbody>
            {federalBreakdown.map(
              ([percent, taxAmount, incomeAcount], index) => (
                <tr key={index} className="breakdown-item">
                  <td>{formatMoney(incomeAcount)}</td>
                  <td>{toFixedDecimal(percent * 100)}%</td>
                  <td>{formatMoney(taxAmount)}</td>
                </tr>
              )
            )}
            <tr key={"sum"} className="breakdown-item">
              <td>{formatMoney(income)}</td>
              <td>{toFixedDecimal(federalPercent)}%</td>
              <td>{formatMoney(federalTotal)}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>State</h2>
        <table className="breakdown">
          <thead>
            <tr key={"header"} className="breakdown-item">
              <th>Taxed Amount</th>
              <th>Tax Percent</th>
              <th>Taxes</th>
            </tr>
          </thead>
          <tbody>
            {stateBreakdown.map(([percent, taxAmount, incomeAcount], index) => (
              <tr key={index} className="breakdown-item">
                <td>{formatMoney(incomeAcount)}</td>
                <td>{toFixedDecimal(percent * 100)}%</td>
                <td>{formatMoney(taxAmount)}</td>
              </tr>
            ))}
            <tr key={"sum"} className="breakdown-item">
              <td>{formatMoney(income)}</td>
              <td>{toFixedDecimal(statePercent)}%</td>
              <td>{formatMoney(stateTotal)}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};
