export const formatMoney = (num: number) => {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });
  return formatter.format(num);
};
