import Link from "next/link";
import { BuyOrder } from "~/lib/types";
import { formatDateFromString, formatDollars } from "~/lib/utils";
import styles from "./BuyOrderCard.module.scss";

interface Props {
  buyOrder: BuyOrder;
}

const BuyOrderCard: React.FunctionComponent<Props> = ({ buyOrder }: Props) => {
  return (
    <Link legacyBehavior href={`/buy-orders/${buyOrder.id}`}>
      <a className={styles.card}>
        <div>
          <p className={styles.underlined}>Order name</p>
          <p>{buyOrder.name}</p>
        </div>
        <div>
          <p className={styles.underlined}>Date Created</p>
          <p>{formatDateFromString(buyOrder.createdAt)}</p>
        </div>
        <div>
          <p className={styles.underlined}>Budget</p>
          <p>{formatDollars(buyOrder.budget)}</p>
        </div>
      </a>
    </Link>
  );
};

export default BuyOrderCard;
