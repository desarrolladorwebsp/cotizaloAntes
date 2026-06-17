export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "",
  timeout: 30_000,
} as const;

export const QUERY_CONFIG = {
  staleTime: 60 * 1000,
  gcTime: 5 * 60 * 1000,
  retry: 1,
} as const;
