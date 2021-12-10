import React from "react";

export const useTaxBreakdown = (income, brackets) => {
  const breakdown = React.useMemo(() => {
    const topIndex = brackets.findIndex((_, index) => {
      return !brackets[index + 1] || income < brackets[index + 1][0];
    });
    if (!topIndex) {
      return [[brackets[0][1], income * brackets[0][1], income]];
    }
    return brackets.slice(0, topIndex + 1).map((item, index) => {
      if (index + 1 > topIndex) {
        return [item[1], (income - item[0]) * item[1], income - item[0]];
      }
      return [
        item[1],
        (brackets[index + 1][0] - item[0]) * item[1],
        brackets[index + 1][0] - item[0]
      ];
    });
  }, [income, brackets]);

  const total = React.useMemo(
    () => breakdown.reduce((acc, item) => acc + item[1], 0),
    [breakdown]
  );

  const percent = React.useMemo(() => (total / income) * 100, [income, total]);

  return {
    breakdown,
    total,
    percent
  };
};
