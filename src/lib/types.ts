export interface BuyOrder {
  id: string;
  budget: number;
  countries: string[];
  createdAt: string;
  datasetIds: number[];
  name: string;
}

export interface Country {
  countryCode: string;
  name: string;
}

export type CountryData = Country & {
  storedData: CountryStoredData[];
};

interface CountryStoredData {
  datasetId: number;
  recordCount: number;
}
