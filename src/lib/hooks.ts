import { useEffect, useState } from "react";
import { fetchBuyOrder, fetchBuyOrders } from "~/lib/api";
import { BuyOrder } from "~/lib/types";

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
