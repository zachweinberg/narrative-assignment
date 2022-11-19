import { useEffect, useState } from "react";
import { fetchBuyOrders } from "./api";
import { BuyOrder } from "./types";

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
