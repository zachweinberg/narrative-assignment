import Loader from "~/components/Loader";
import { useBuyOrders, useCountryConfig } from "~/lib/hooks";
import BuyOrderCard from "../BuyOrderCard";
import CountrySelect from "../CountrySelect";
import Error from "../Error";
import Heading from "../Heading";
import styles from "./BuyOrdersList.module.scss";

const BuyOrdersList: React.FunctionComponent = () => {
  const { buyOrders, loading, error } = useBuyOrders();
  const { showAll, enabledCountryCodes, countryListString } =
    useCountryConfig();

  const countryBuyOrders = showAll
    ? buyOrders
    : buyOrders.filter((order) =>
        order.countries.some((countryCode) =>
          enabledCountryCodes.includes(countryCode)
        )
      );

  if (error) {
    return <Error message="Could not load buy orders." />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.buyOrderList}>
      <Heading text="Your Buy Orders" />

      <div className={styles.widthContainer}>
        <p>
          Showing <strong>{countryBuyOrders.length}</strong> results from{" "}
          <strong> {countryListString}</strong>
        </p>

        {countryBuyOrders.map((buyOrder) => (
          <BuyOrderCard key={buyOrder.id} buyOrder={buyOrder} />
        ))}
      </div>

      <CountrySelect />
    </div>
  );
};

export default BuyOrdersList;
