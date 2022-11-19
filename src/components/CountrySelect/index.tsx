import useGlobalState from "~/lib/global-state";
import styles from "./CountrySelect.module.scss";

const CountrySelect: React.FunctionComponent = () => {
  const countries = useGlobalState((state) => state.countries);
  const selectedCountries = useGlobalState((state) => state.selectedCountries);
  const setSelectedCountries = useGlobalState(
    (state) => state.setSelectedCountries
  );

  return (
    <div className={styles.container}>
      <p className={styles.underlined}>Included countries:</p>

      <ul>
        {Object.entries(countries).map(([countryCode, name]) => {
          return (
            <li key={countryCode}>
              <button>{name}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CountrySelect;
