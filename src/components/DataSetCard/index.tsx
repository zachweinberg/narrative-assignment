import Link from "next/link";
import { Dataset } from "~/lib/types";
import { formatDollars } from "~/lib/utils";
import styles from "./DatasetCard.module.scss";

interface Props {
  dataset: Dataset;
}

const DatasetCard: React.FunctionComponent<Props> = ({ dataset }: Props) => {
  return (
    <Link legacyBehavior href={`/buy-orders/${dataset.id}`}>
      <a className={styles.card}>
        <div className={styles.imageRow}>
          <img src={dataset.thumbnailUrl} className={styles.thumbnail} />
          <p>{dataset.label}</p>
        </div>

        <div>
          <div className={styles.row}>
            <p className={styles.underlined}>Dataset Description</p>
            <p>{dataset.description}</p>
          </div>
        </div>

        <div>
          <div className={styles.flexRow}>
            <p className={styles.underlined}>Cost per record</p>
            <p>{formatDollars(dataset.costPerRecord)}</p>
          </div>

          <div className={styles.flexRow}>
            <p className={styles.underlined}>Available Records</p>
            <p>{dataset.totalRecordCount}</p>
          </div>

          <div className={styles.row}>
            <p className={styles.underlined}>Included Countries</p>
          </div>

          <div className={styles.countryBadges}>
            {dataset.countries.map((c) => (
              <span>{c}</span>
            ))}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default DatasetCard;
