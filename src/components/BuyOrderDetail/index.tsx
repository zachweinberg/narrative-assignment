import useGlobalState from "~/lib/global-state";
import { useBuyOrder } from "~/lib/hooks";
import { formatDateFromString, formatDollars } from "~/lib/utils";
import Error from "../Error";
import Heading from "../Heading";
import Loader from "../Loader";
import styles from "./BuyOrderDetail.module.scss";

interface Props {
  buyOrderID: number;
}

const BuyOrderDetail: React.FunctionComponent<Props> = ({
  buyOrderID,
}: Props) => {
  const datasets = useGlobalState((state) => state.datasets);
  const { buyOrder, loading, error } = useBuyOrder(buyOrderID);

  if (loading) {
    return <Loader />;
  }

  if (error || !buyOrder) {
    return <Error message={"Could not load buy order."} />;
  }

  return (
    <div className={styles.container}>
      <Heading text="Buy Order Details" />

      <div className={styles.card}>
        <div>
          <p className="underlined">Order name</p>
          <p>{buyOrder.name}</p>
        </div>
        <div>
          <p className="underlined">Date created</p>
          <p>{formatDateFromString(buyOrder.createdAt)}</p>
        </div>
        <div>
          <p className="underlined">Order bydget</p>
          <p>{formatDollars(buyOrder.budget)}</p>
        </div>

        <div></div>

        <div>
          <p className="underlined">Included datasets</p>
          <div className={styles.datasetsGrid}>
            {buyOrder.datasetIds.map((id) => (
              <div key={id}>
                <img src={datasets[id].thumbnailUrl} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="underlined">Date created</p>
          <p>{formatDateFromString(buyOrder.createdAt)}</p>
        </div>
        <div>
          <p className="underlined">Date created</p>
          <p>{formatDateFromString(buyOrder.createdAt)}</p>
        </div>
        <div>
          <p className="underlined">Date created</p>
          <p>{formatDateFromString(buyOrder.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default BuyOrderDetail;
