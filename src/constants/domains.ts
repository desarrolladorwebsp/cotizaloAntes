export const PRODUCT_DOMAINS = {
  INSURANCE: "insurance",
  ISAPRE: "isapre",
  AFP: "afp",
  CREDIT: "credit",
  FINANCIAL: "financial",
} as const;

export type ProductDomain = (typeof PRODUCT_DOMAINS)[keyof typeof PRODUCT_DOMAINS];

export const ACTIVE_DOMAINS: ProductDomain[] = [PRODUCT_DOMAINS.INSURANCE];
