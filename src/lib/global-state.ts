import create from "zustand";
import { fetchCountryData } from "./api";

interface GlobalState {
  countries: Record<string, { name: string; enabled: boolean }>;
  toggleCountry: (countryCode: string) => void;
  loadCountryData: () => Promise<void>;
}

const useGlobalState = create<GlobalState>((set) => ({
  countries: {},

  toggleCountry: (countryCode) =>
    set((state) => ({
      countries: {
        ...state.countries,
        [countryCode]: {
          ...state.countries[countryCode],
          enabled: !state.countries[countryCode].enabled,
        },
      },
    })),

  loadCountryData: async () => {
    const countryData = await fetchCountryData();

    const countries = countryData.reduce(
      (accum, c) => ({
        ...accum,
        [c.countryCode]: { name: c.name, enabled: true },
      }),
      {}
    );

    set({
      countries,
    });
  },
}));

export default useGlobalState;
