import create from "zustand";
import { fetchCountryData } from "./api";
import { Country } from "./types";

interface GlobalState {
  countries: Country[];
  loadCountryData: () => Promise<void>;
}

const useBearStore = create<GlobalState>((set) => ({
  countries: [],

  loadCountryData: async () => {
    const countryData = await fetchCountryData();
    const countries = countryData.map((c) => ({
      name: c.name,
      countryCode: c.countryCode,
    }));
    set({ countries });
  },
}));
