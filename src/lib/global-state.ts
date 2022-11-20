import create from "zustand";
import { fetchCountryData, fetchDatasets } from "../lib/api";
import { CountryMap, Dataset } from "../lib/types";

// Global state to store countries config and datasets

interface GlobalState {
  countries: CountryMap;
  datasets: Dataset[];
  toggleCountry: (countryCode: string) => void;
  loadCountriesAndDatasets: () => Promise<void>;
}

const useGlobalState = create<GlobalState>((set) => ({
  countries: {},
  datasets: [],

  toggleCountry: (countryCode) => {
    set((state) => ({
      countries: {
        ...state.countries,
        [countryCode]: {
          ...state.countries[countryCode],
          enabled: !state.countries[countryCode].enabled,
        },
      },
    }));
  },

  loadCountriesAndDatasets: async () => {
    const [countriesResponse, datasetsResponse] = await Promise.all([
      fetchCountryData(),
      fetchDatasets(),
    ]);

    const countryMap = countriesResponse.reduce(
      (accum, curr) => ({
        ...accum,
        [curr.countryCode]: { name: curr.name, enabled: true },
      }),
      {}
    );

    const finalDatasets: Dataset[] = [];

    // Merge datasets with country data
    for (const dataset of datasetsResponse) {
      const enabledCountriesForDataset = countriesResponse.filter(
        ({ storedData }) =>
          storedData.some(
            ({ datasetId, recordCount }) =>
              datasetId === dataset.id && recordCount > 0
          )
      );

      const totalRecordCount = enabledCountriesForDataset.reduce(
        (total, country) => {
          const recordData = country.storedData.find(
            ({ datasetId }) => datasetId === dataset.id
          );

          return total + (recordData?.recordCount ?? 0);
        },
        0
      );

      const countryNames = enabledCountriesForDataset.map(
        ({ countryCode }) => countryCode
      );

      finalDatasets.push({
        ...dataset,
        countries: countryNames,
        totalRecordCount,
      });
    }

    set({
      countries: countryMap,
      datasets: finalDatasets,
    });
  },
}));

export default useGlobalState;
