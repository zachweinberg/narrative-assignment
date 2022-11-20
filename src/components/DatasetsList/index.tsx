import useGlobalState from "~/lib/global-state";
import { useCountryConfig } from "~/lib/hooks";
import CountrySelect from "../CountrySelect";
import DatasetCard from "../DataSetCard";
import Heading from "../Heading";
import styles from "./DatasetsList.module.scss";

const DatasetsList: React.FunctionComponent = () => {
  const datasets = useGlobalState((state) => state.datasets);
  const { showAll, enabledCountryCodes, countryListString } =
    useCountryConfig();
  console.log(enabledCountryCodes);
  console.log(datasets);
  const countryDatasets = showAll
    ? datasets
    : datasets.filter((dataset) =>
        dataset.countries.some((countryCode) =>
          enabledCountryCodes.includes(countryCode)
        )
      );

  return (
    <div className={styles.container}>
      <Heading text="Datasets" />

      <p className={styles.countryResults}>
        Showing <strong>{countryDatasets.length}</strong> results from{" "}
        <strong>{countryListString}</strong>
      </p>

      <div className={styles.cards}>
        {countryDatasets.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </div>

      <CountrySelect />
    </div>
  );
};

export default DatasetsList;
