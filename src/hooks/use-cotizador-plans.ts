"use client";

import { useQuery } from "@tanstack/react-query";

import { type cotizadorIsapresConfig } from "@/constants/cotizador-isapres";
import {
  type ApiHealthPlanSummary,
  mapPreviewPlanToCotizadorPlan,
} from "@/lib/cotizador/plan-mapper";
import type { CotizadorPlan } from "@/types/cotizador-plan";

const DEFAULT_UF_TO_CLP = 39_000;

type PlansPreviewResponse = {
  data: ApiHealthPlanSummary[] | (typeof cotizadorIsapresConfig.plans)[number][];
  meta?: { total?: number; source?: string };
};

function isApiPlanSummary(
  plan: ApiHealthPlanSummary | (typeof cotizadorIsapresConfig.plans)[number],
): plan is ApiHealthPlanSummary {
  return "coverage_summary" in plan;
}

async function fetchCotizadorPlans(ufToClp: number): Promise<CotizadorPlan[]> {
  const response = await fetch("/api/cotizador/plans/preview", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los planes.");
  }

  const payload = (await response.json()) as PlansPreviewResponse;

  return payload.data.map((plan) => {
    if (isApiPlanSummary(plan)) {
      return mapPreviewPlanToCotizadorPlan(plan, ufToClp);
    }

    return {
      id: plan.id,
      code: plan.code,
      provider: plan.provider,
      planName: plan.code,
      tags: [...plan.tags],
      priceUf: plan.priceUf,
      priceClp: plan.priceClp,
      hospitalCoverage: plan.hospitalCoverage,
      ambulatoryCoverage: plan.ambulatoryCoverage,
      hospitalPercentages: plan.hospitalPercentages,
      ambulatoryPercentages: plan.ambulatoryPercentages,
      hospitals: plan.hospitals.map((item) => ({ ...item })),
      centers: plan.centers.map((item) => ({ ...item })),
      hasTop: plan.hasTop ?? false,
      basePriceUf: plan.basePriceUf,
      pdfUrl: null,
    };
  });
}

export const cotizadorPlansQueryKey = ["cotizador-plans"] as const;

export function useCotizadorPlans(ufToClp = DEFAULT_UF_TO_CLP) {
  return useQuery({
    queryKey: [...cotizadorPlansQueryKey, ufToClp],
    queryFn: () => fetchCotizadorPlans(ufToClp),
    staleTime: 5 * 60 * 1000,
  });
}
