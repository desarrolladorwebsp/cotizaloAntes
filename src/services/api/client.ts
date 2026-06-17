import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";

import { API_CONFIG } from "@/constants/config";
import type { ApiError } from "@/types/api";

function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => config,
    (error: AxiosError) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
      const apiError: ApiError = {
        message: error.response?.data?.message ?? error.message ?? "Error desconocido",
        status: error.response?.status ?? 500,
        code: error.response?.data?.code,
      };

      return Promise.reject(apiError);
    },
  );

  return client;
}

export const apiClient = createApiClient();
