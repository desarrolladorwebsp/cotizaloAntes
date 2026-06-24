import type { CotizadorPlan } from "@/types/cotizador-plan";

type ApiPlanCoverageSummary = {
  clinic_count: number;
  hospital_percentages: number[];
  ambulatory_percentages: number[];
  hospital_avg: number;
  ambulatory_avg: number;
};

export type ApiHealthPlanSummary = {
  isapre: string;
  plan_name: string;
  unique_code: string;
  base_price_uf: number;
  has_top: boolean;
  additional_notes: string | null;
  pdf_url?: string | null;
  coverage_summary: ApiPlanCoverageSummary;
};

function formatUfLabel(value: number): string {
  return value.toLocaleString("es-CL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });
}

function formatClpLabel(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

function resolveMaxPercentage(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.max(...values);
}

export function mapPreviewPlanToCotizadorPlan(
  plan: ApiHealthPlanSummary,
  ufToClp: number,
): CotizadorPlan {
  const summary = plan.coverage_summary;
  const hospitalPercentages = summary.hospital_percentages ?? [];
  const ambulatoryPercentages = summary.ambulatory_percentages ?? [];

  const tags = [`Base ${formatUfLabel(plan.base_price_uf)} UF`];
  if (plan.has_top) tags.push("Top");
  if (plan.additional_notes?.trim()) tags.push(plan.additional_notes.trim());

  const monthlyClp = Math.round(plan.base_price_uf * ufToClp);

  return {
    id: plan.unique_code,
    code: plan.unique_code,
    provider: plan.isapre,
    planName: plan.plan_name,
    tags,
    priceUf: formatUfLabel(plan.base_price_uf),
    priceClp: formatClpLabel(monthlyClp),
    hospitalCoverage:
      summary.hospital_avg > 0
        ? Math.round(summary.hospital_avg)
        : resolveMaxPercentage(hospitalPercentages),
    ambulatoryCoverage:
      summary.ambulatory_avg > 0
        ? Math.round(summary.ambulatory_avg)
        : resolveMaxPercentage(ambulatoryPercentages),
    hospitalPercentages,
    ambulatoryPercentages,
    hospitals: [],
    centers: [],
    hasTop: plan.has_top,
    basePriceUf: plan.base_price_uf,
    pdfUrl: plan.pdf_url ?? null,
  };
}

export function formatCoveragePercentages(values: number[]): string {
  if (values.length === 0) return "—";
  return values.map((value) => `${value}%`).join(" · ");
}
