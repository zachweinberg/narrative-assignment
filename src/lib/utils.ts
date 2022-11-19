export const formatDollars = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    maximumFractionDigits: 2,
    currency: "USD",
  }).format(amount);
};
