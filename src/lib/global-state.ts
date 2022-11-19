import create from "zustand";
import { fetchCountryData } from "./api";

interface GlobalState {
  countries: Record<string, string>;
  selectedCountries: string[];
  setSelectedCountries: string[];
  loadCountryData: () => Promise<void>;
}

const useGlobalState = create<GlobalState>((set) => ({
  countries: {},

  selectedCountries: [],
  setSelectedCountries: [],

  loadCountryData: async () => {
    const countryData = await fetchCountryData();

    const countries = countryData.reduce(
      (accum, c) => ({
        ...accum,
        [c.countryCode]: c.name,
      }),
      {}
    );

    set({ countries });
  },
}));

export default useGlobalState;
