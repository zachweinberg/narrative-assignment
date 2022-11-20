import { useEffect, useMemo, useState } from "react";
import { fetchBuyOrder, fetchBuyOrders } from "../lib/api";
import { BuyOrder } from "../lib/types";
import useGlobalState from "./global-state";

export const useBuyOrders = () => {
  const [buyOrders, setBuyOrders] = useState<BuyOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchBuyOrders()
      .then((orders) => setBuyOrders(orders))
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { buyOrders, loading, error };
};

export const useBuyOrder = (buyOrderID: number) => {
  const [buyOrder, setBuyOrder] = useState<BuyOrder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetchBuyOrder(buyOrderID)
      .then((order) => setBuyOrder(order))
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { buyOrder, loading, error };
};

export const useCountryConfig = () => {
  const countries = useGlobalState((state) => state.countries);

  const allEnabled = useMemo(
    () => Object.keys(countries).every((code) => countries[code].enabled),
    [countries]
  );

  const allDisabled = useMemo(
    () => Object.keys(countries).every((code) => !countries[code].enabled),
    [countries]
  );

  const countryListString = useMemo(
    () =>
      allDisabled || allEnabled
        ? "all countries"
        : Object.values(countries)
            .filter(({ enabled }) => !!enabled)
            .map((val) => val.name)
            .join(" & "),
    [countries]
  );

  const enabledCountryCodes = useMemo(() => {
    return Object.keys(countries).filter(
      (countryCode) => countries[countryCode].enabled
    );
  }, [countries]);

  return {
    showAll: allDisabled || allEnabled,
    enabledCountryCodes,
    countryListString,
  };
};
