import { BuyOrder } from "~/lib/types";
import styles from "./BuyOrderCard.module.scss";

interface Props {
  buyOrder: BuyOrder;
}

const BuyOrderCard: React.FunctionComponent<Props> = ({ buyOrder }: Props) => {
  return (
    <div className={styles.card}>
      <div>
        <p>Order name</p>
        <p>First order</p>
      </div>
      <div>
        <p>Date created</p>
        <p>12/12/5215</p>
      </div>
      <div>
        <p>Budget</p>
        <p>$1098</p>
      </div>
    </div>
  );
};

export default BuyOrderCard;
