import { useBuyOrder } from "~/lib/hooks";
import Loader from "../Loader";
import styles from "./BuyOrderDetail.module.scss";

interface Props {
  buyOrderID: number;
}

const BuyOrderDetail: React.FunctionComponent<Props> = ({
  buyOrderID,
}: Props) => {
  const { buyOrder, loading, error } = useBuyOrder(buyOrderID);

  if (error) {
    return <p>Could not load buy order.</p>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <h1>Buy Order Details</h1>
    </div>
  );
};

export default BuyOrderDetail;
