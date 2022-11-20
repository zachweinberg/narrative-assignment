import { useMemo } from "react";
import Loader from "~/components/Loader";
import useGlobalState from "~/lib/global-state";
import { useBuyOrders } from "~/lib/hooks";
import BuyOrderCard from "../BuyOrderCard";
import CountrySelect from "../CountrySelect";
import Error from "../Error";
import styles from "./BuyOrdersList.module.scss";

const BuyOrdersList: React.FunctionComponent = () => {
  const countries = useGlobalState((state) => state.countries);
  const { buyOrders, loading, error } = useBuyOrders();

  const allEnabled = Object.keys(countries).every(
    (code) => countries[code].enabled
  );

  const allDisabled = Object.keys(countries).every(
    (code) => !countries[code].enabled
  );

  const countryBuyOrders = useMemo(() => {
    if (allEnabled || allDisabled) {
      return buyOrders;
    }

    return buyOrders.filter((order) =>
      order.countries.some((code) => countries[code].enabled)
    );
  }, [buyOrders, countries]);

  if (error) {
    return <Error message="Could not load buy orders." />;
  }

  if (loading) {
    return <Loader />;
  }

  const countryList = allDisabled
    ? "all countries"
    : Object.values(countries)
        .filter(({ enabled }) => !!enabled)
        .map((val) => val.name)
        .join(" & ");

  return (
    <div className={styles.container}>
      <h1>Your Buy Orders</h1>

      <div className={styles.cards}>
        <p>
          Showing <strong>{countryBuyOrders.length}</strong> results from{" "}
          <strong> {countryList}</strong>
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
