export type CoverageProvider = {
  name: string;
  percentage: number;
};

export type CotizadorPlan = {
  id: string;
  code: string;
  provider: string;
  planName: string;
  tags: string[];
  priceUf: string;
  priceClp: string;
  hospitalCoverage: number;
  ambulatoryCoverage: number;
  hospitalPercentages: number[];
  ambulatoryPercentages: number[];
  hospitals: CoverageProvider[];
  centers: CoverageProvider[];
  hasTop: boolean;
  basePriceUf: number;
};
