export const toFixedDecimal = (num: number, decimals = 2): string => {
  const internalNum = Number.isNaN(num) ? 0 : num;
  return parseFloat(`${internalNum}`).toFixed(decimals);
};
