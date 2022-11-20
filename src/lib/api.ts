import axios, { AxiosRequestConfig } from "axios";
import { logError } from "./errors";
import {
  BuyOrder,
  FetchCountryDataResponse,
  FetchDatasetsResponse,
} from "./types";

// This should be placed in an .env file,
//  but hardcoded for the purposes of this assignment
const baseURL = `https://6377fb3d5c477765122a8d28.mockapi.io/maritime/`;

const AxiosInstance = axios.create({
  baseURL: baseURL,
});

const makeRequest = async (entityName: string, opts: AxiosRequestConfig) => {
  try {
    console.log(`> HTTP Request: ${entityName}`);
    const response = await AxiosInstance.request(opts);
    return response.data;
  } catch (err) {
    logError(err);
    throw err;
  }
};

export const fetchCountryData = async (): Promise<FetchCountryDataResponse> => {
  return makeRequest("GET countries", { url: "/countries", method: "GET" });
};

export const fetchDatasets = async (): Promise<FetchDatasetsResponse> => {
  return makeRequest("GET datasets", { url: "/datasets", method: "GET" });
};

export const fetchBuyOrder = async (buyOrderID: number): Promise<BuyOrder> => {
  return makeRequest(`GET buy-order/${buyOrderID}`, {
    url: `/buy-orders/${buyOrderID}`,
    method: "GET",
  });
};

export const fetchBuyOrders = async (): Promise<BuyOrder[]> => {
  return makeRequest("GET buy-orders", { url: "/buy-orders", method: "GET" });
};

export const deleteBuyOrder = async (buyOrderID: number) => {
  return makeRequest(`DELETE buy-order/${buyOrderID}`, {
    url: `/buy-orders/${buyOrderID}`,
    method: "DELETE",
  });
};

export const createBuyOrder = async (buyOrder: Omit<BuyOrder, "id">) => {
  return makeRequest("POST buy-order", {
    url: `/buy-orders`,
    method: "POST",
    data: buyOrder,
  });
};
