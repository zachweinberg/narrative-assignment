import useGlobalState from "~/lib/global-state";
import styles from "./CountrySelect.module.scss";

const CountrySelect: React.FunctionComponent = () => {
  const countries = useGlobalState((state) => state.countries);
  const toggleCountry = useGlobalState((state) => state.toggleCountry);

  return (
    <div className={styles.container}>
      <p className="underlined mb-10">Included countries:</p>

      <ul>
        {Object.entries(countries).map(([countryCode, { name, enabled }]) => {
          return (
            <li key={countryCode}>
              <button
                className={enabled ? styles.enabled : ""}
                onClick={() => toggleCountry(countryCode)}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CountrySelect;
