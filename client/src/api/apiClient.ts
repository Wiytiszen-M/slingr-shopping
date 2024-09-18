import axios from "axios";
import { API_BASE_URL, defaultHeaders } from "./config";

declare module "axios" {
  export interface AxiosRequestConfig {
    isParamsTimezone?: boolean;
    successMessage?: string;
    infoMessage?: string;
    areNullishValuesIncludedInParams?: boolean;
  }

  export interface AxiosInstance {
    get: <T = unknown, D = unknown>(
      url: string,
      config?: AxiosRequestConfig<D>
    ) => Promise<T>;
  }
}

const baseURL = API_BASE_URL;
const headers = { ...defaultHeaders };

export const apiClient = axios.create({ baseURL, headers });

const removeNullishParams = (params: Record<string, unknown>) => {
  return Object.keys(params).reduce((acc, key) => {
    if (params[key] !== null && params[key] !== undefined) {
      acc[key] = params[key];
    }
    return acc;
  }, {} as Record<string, unknown>);
};

apiClient.interceptors.request.use(
  (config) => {
    if (config.areNullishValuesIncludedInParams && config.params) {
      config.params = removeNullishParams(config.params);
    }

    if (["post", "put", "patch", "delete"].includes(config.method ?? "")) {
      config.data = { ...config.data };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
