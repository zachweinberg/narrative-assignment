import { DateTime } from "luxon";

export const formatDollars = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    maximumFractionDigits: 2,
    currency: "USD",
  }).format(amount);
};

export const formatDateFromString = (date: string) => {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT);
};
