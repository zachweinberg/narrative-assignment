export interface BuyOrder {
  id: number;
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

export interface Dataset {
  id: number;
  name: string;
  label: string;
  description: string;
  thumbnailUrl: string;
  costPerRecord: number;
  countries: string[];
  totalRecordCount: number;
}

export interface CountryData {
  name: string;
  enabled: boolean;
}

export type CountryMap = Record<string, CountryData>;

export type FetchCountryDataResponse = Array<{
  countryCode: string;
  name: string;
  storedData: Array<{ datasetId: number; recordCount: number }>;
}>;

export type FetchDatasetsResponse = Array<{
  id: number;
  name: string;
  label: string;
  description: string;
  thumbnailUrl: string;
  costPerRecord: number;
}>;
