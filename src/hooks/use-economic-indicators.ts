"use client";

import { useQuery } from "@tanstack/react-query";

import { INDICATORS_QUERY_CONFIG } from "@/constants/footer";
import { fetchEconomicIndicators } from "@/lib/indicators";

export const economicIndicatorsQueryKey = ["economic-indicators"] as const;

export function useEconomicIndicators() {
  return useQuery({
    queryKey: economicIndicatorsQueryKey,
    queryFn: fetchEconomicIndicators,
    staleTime: INDICATORS_QUERY_CONFIG.staleTime,
    gcTime: INDICATORS_QUERY_CONFIG.gcTime,
    refetchInterval: INDICATORS_QUERY_CONFIG.refetchInterval,
    retry: INDICATORS_QUERY_CONFIG.retry,
    refetchOnWindowFocus: true,
  });
}
