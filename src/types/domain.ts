import type { ProductDomain } from "@/constants/domains";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureModule {
  domain: ProductDomain;
  slug: string;
  name: string;
  enabled: boolean;
}
