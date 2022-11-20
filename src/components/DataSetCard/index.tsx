import cn from "classnames";
import Image from "next/image";
import useGlobalState from "../../lib/global-state";
import { Dataset } from "../../lib/types";
import { formatDollars } from "../../lib/utils";
import styles from "./DatasetCard.module.scss";

interface Props {
  dataset: Dataset;
}

const DatasetCard: React.FunctionComponent<Props> = ({ dataset }: Props) => {
  const countries = useGlobalState((state) => state.countries);

  return (
    <div className={styles.card}>
      <div className={styles.imageRow}>
        <Image
          alt="Dataset image"
          width={100}
          height={100}
          src={dataset.thumbnailUrl}
        />
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

        <p className="underlined mb-20">Included countries</p>

        <div className={styles.countryBadges}>
          {dataset.countries.map((countryCode) => (
            <span key={countryCode}>{countries[countryCode].name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;
