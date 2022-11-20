import Image from "next/image";
import { useRouter } from "next/router";
import { deleteBuyOrder } from "../../lib/api";
import { logError } from "../../lib/errors";
import useGlobalState from "../../lib/global-state";
import { useBuyOrder } from "../../lib/hooks";
import { formatDateFromString, formatDollars } from "../../lib/utils";
import Button from "../Button";
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
  const countries = useGlobalState((state) => state.countries);
  const { buyOrder, loading, error } = useBuyOrder(buyOrderID);
  const router = useRouter();

  if (loading) {
    return <Loader />;
  }

  if (error || !buyOrder) {
    return <Error message={"Could not load buy order."} />;
  }

  const renderDatasetsGrid = () => {
    return buyOrder.datasetIds.map((datasetID) => {
      const dataset = datasets.find((d) => d.id === datasetID);

      if (!dataset) {
        return null;
      }

      return (
        <div key={datasetID}>
          <Image
            src={dataset.thumbnailUrl}
            width={40}
            height={40}
            alt="Data set image"
          />
          <div>
            <p className="mb-5">{dataset.label}</p>
            <p>{formatDollars(dataset.costPerRecord)} per record</p>
          </div>
        </div>
      );
    });
  };

  const onDeleteBuyOrder = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this buy order?")) {
        await deleteBuyOrder(buyOrder.id);
        router.push("/buy-orders");
      }
    } catch (err) {
      logError(err);
      alert("Something went wrong while deleting this buy order.");
    }
  };

  return (
    <div className={styles.container}>
      <Heading text="Buy Order Details" />

      <div className={styles.card}>
        <div className={styles.row}>
          <div>
            <p className="underlined mb-5">Order name</p>
            <p>{buyOrder.name}</p>
          </div>

          <div>
            <p className="underlined mb-5">Date created</p>
            <p>{formatDateFromString(buyOrder.createdAt)}</p>
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <p className="underlined mb-5">Order budget</p>
            <p>{formatDollars(buyOrder.budget)}</p>
          </div>

          <div></div>
        </div>

        <div className="mb-20">
          <p className="underlined mb-10">Included datasets</p>
          <div className={styles.datasetsGrid}>{renderDatasetsGrid()}</div>
        </div>

        <div className="mb-20">
          <p className="underlined mb-10">Included countries</p>
          <div className={styles.countryBadges}>
            {buyOrder.countries.map((countryCode) => (
              <span>{countries[countryCode].name}</span>
            ))}
          </div>
        </div>

        <div className={styles.buttonsRow}>
          <Button
            onClick={() => router.push(`/buy-orders/edit/${buyOrder.id}`)}
          >
            Edit Order
          </Button>
          <Button onClick={onDeleteBuyOrder}>Delete Order</Button>
        </div>
      </div>
    </div>
  );
};

export default BuyOrderDetail;
