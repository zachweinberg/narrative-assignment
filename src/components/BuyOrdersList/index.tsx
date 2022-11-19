import { useBuyOrders } from "~/lib/hooks";
import BuyOrderCard from "../BuyOrderCard";
import CountrySelect from "../CountrySelect";
import Loader from "../Loader";
import styles from "./BuyOrdersList.module.scss";

const BuyOrdersList: React.FunctionComponent = () => {
  const { buyOrders, loading, error } = useBuyOrders();

  if (error) {
    return <p>Could not load buy orders.</p>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <h1>Your Buy Orders</h1>

      <div className={styles.cards}>
        <p>Showing {buyOrders.length} results from </p>
        {buyOrders.map((buyOrder) => (
          <BuyOrderCard key={buyOrder.id} buyOrder={buyOrder} />
        ))}
      </div>
      <CountrySelect />
    </div>
  );
};

export default BuyOrdersList;
