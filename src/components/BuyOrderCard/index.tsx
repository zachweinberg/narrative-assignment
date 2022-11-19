import { DateTime } from "luxon";
import Link from "next/link";
import { BuyOrder } from "~/lib/types";
import { formatDollars } from "~/lib/utils";
import styles from "./BuyOrderCard.module.scss";

interface Props {
  buyOrder: BuyOrder;
}

const BuyOrderCard: React.FunctionComponent<Props> = ({ buyOrder }: Props) => {
  const formattedDate = DateTime.fromISO(buyOrder.createdAt).toLocaleString(
    DateTime.DATE_SHORT
  );

  return (
    <Link legacyBehavior href={`/buy-orders/${buyOrder.id}`}>
      <div className={styles.card}>
        <div>
          <p className={styles.underlined}>Order name</p>
          <p>{buyOrder.name}</p>
        </div>
        <div>
          <p className={styles.underlined}>Date Created</p>
          <p>{formattedDate}</p>
        </div>
        <div>
          <p className={styles.underlined}>Budget</p>
          <p>{formatDollars(buyOrder.budget)}</p>
        </div>
      </div>
    </Link>
  );
};

export default BuyOrderCard;
