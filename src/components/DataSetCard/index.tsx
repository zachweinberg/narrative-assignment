import cn from "classnames";
import Link from "next/link";
import useGlobalState from "~/lib/global-state";
import { Dataset } from "~/lib/types";
import { formatDollars } from "~/lib/utils";
import styles from "./DatasetCard.module.scss";

interface Props {
  dataset: Dataset;
}

const DatasetCard: React.FunctionComponent<Props> = ({ dataset }: Props) => {
  const countries = useGlobalState((state) => state.countries);

  return (
    <Link legacyBehavior href={`/buy-orders/${dataset.id}`}>
      <a className={styles.card}>
        <div className={styles.imageRow}>
          <img src={dataset.thumbnailUrl} className={styles.thumbnail} />
          <p>{dataset.label}</p>
        </div>

        <div>
          <p className="underlined mb-5">Dataset Description</p>
          <p>{dataset.description}</p>
        </div>

        <div>
          <div className={cn([styles.flexRow, "mb-10"])}>
            <p className="underlined">Cost per record</p>
            <p>{formatDollars(dataset.costPerRecord)}</p>
          </div>

          <div className={cn([styles.flexRow, "mb-10"])}>
            <p className="underlined">Available Records</p>
            <p>{dataset.totalRecordCount}</p>
          </div>

          <p className="underlined mb-20">Included Countries</p>

          <div className={styles.countryBadges}>
            {dataset.countries.map((countryCode) => (
              <span>{countries[countryCode].name}</span>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default DatasetCard;
