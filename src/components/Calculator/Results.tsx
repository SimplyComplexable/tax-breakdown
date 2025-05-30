import { formatMoney } from "lib/formatMoney";
import { toFixedDecimal } from "lib/toFixedDecimal";
import React from "react";

export interface ResultsProps {
  title: string;
  income: number;
  percent: number;
  total: number;
}

const Results = ({ title, income, percent, total }: ResultsProps) => {
  return (
    <section>
      <h2>{title}</h2>
      <table className="breakdown">
        <thead>
          <tr className="breakdown-item">
            <th>Taxed Amount</th>
            <th>Tax Percent</th>
            <th>Taxes</th>
          </tr>
        </thead>
        <tbody>
          <tr className="breakdown-item no-border">
            <td>{formatMoney(income)}</td>
            <td>{toFixedDecimal(percent)}%</td>
            <td>{formatMoney(total)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Results;
