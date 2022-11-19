import { useBuyOrders } from "~/lib/hooks";
import BuyOrderCard from "../BuyOrderCard";
import styles from "./BuyOrders.module.scss";

const BuyOrders: React.FunctionComponent = () => {
  const { buyOrders, loading, error } = useBuyOrders();

  if (error) {
    return <p>Could not load buy orders.</p>;
  }

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Your Buy Orders</h1>

      <div className={styles.cards}>
        <p>Showing {buyOrders.length} results from </p>
        {buyOrders.map((buyOrder) => (
          <BuyOrderCard buyOrder={buyOrder} />
        ))}
      </div>
    </div>
  );
};

export default BuyOrders;
