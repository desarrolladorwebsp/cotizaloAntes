"use client";

import { Plus, Search } from "lucide-react";
import { useState } from "react";

import { CotizadorIsapresBackground } from "@/components/sections/cotizador-isapres/cotizador-isapres-background";
import { PlanResultCard } from "@/components/sections/cotizador-isapres/plan-result-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionTitle } from "@/components/ui/section-title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cotizadorIsapresConfig } from "@/constants/cotizador-isapres";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

const { sectionId, eyebrow, title, resultsSummary, regions, genders, sortOptions, isapreFilters, priceRange, plans } =
  cotizadorIsapresConfig;

function formatClp(value: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function CotizadorIsapresSection({ asPage = false }: { asPage?: boolean }) {
  const [currency, setCurrency] = useState<"pesos" | "uf">("pesos");
  const [sortBy, setSortBy] = useState<string>(sortOptions[0]);
  const [region, setRegion] = useState<string>(regions[0]);
  const [gender, setGender] = useState<string>(genders[0]);

  const handleSearch = () => {
    window.location.href = siteConfig.cotizadorIsapresUrl;
  };

  return (
    <section
      id={sectionId}
      className="relative w-full overflow-hidden py-16 sm:py-20 md:py-28"
      aria-labelledby="cotizador-isapres-title"
    >
      <CotizadorIsapresBackground />

      <Container size="2xl" padding="default" className="relative z-10">
        <div className="space-y-6">
          <header className="space-y-2">
            <SectionTitle
              id="cotizador-isapres-title"
              as={asPage ? "h1" : "h2"}
              eyebrow={eyebrow}
              prefix={title.prefix}
              highlight={title.highlight}
            />
          </header>

          <div className="rounded-2xl border border-border/70 bg-surface p-4 shadow-sm sm:p-5">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_88px_120px_auto_auto] lg:items-end">
              <div className="space-y-1.5">
                <Label htmlFor="region">Región</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger id="region">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="income">Ingreso mensual líquido</Label>
                <Input id="income" type="text" inputMode="numeric" placeholder="Ej: $1.200.000" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="age">Edad</Label>
                <Input id="age" type="number" min={18} max={99} placeholder="35" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gender">Sexo</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="button"
                variant="ghost"
                className="text-primary h-11 justify-start gap-1.5 px-0 text-sm font-medium hover:bg-transparent hover:text-primary-hover lg:mb-0.5 lg:self-end"
              >
                <Plus className="h-4 w-4" aria-hidden />
                Agregar asegurados
              </Button>

              <Button
                type="button"
                onClick={handleSearch}
                className="h-11 rounded-full px-6 text-sm font-semibold shadow-glow lg:col-span-1"
              >
                Buscar mejor plan
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full px-3 py-1 text-xs font-semibold">
                Mostrando {resultsSummary.showing} de {resultsSummary.total}
              </Badge>
              <p className="text-muted-foreground text-sm">{resultsSummary.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Label className="text-muted-foreground text-xs whitespace-nowrap">Ordenar por</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-9 w-[140px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted flex rounded-full p-0.5">
                <button
                  type="button"
                  onClick={() => setCurrency("pesos")}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    currency === "pesos"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground",
                  )}
                >
                  Pesos
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("uf")}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    currency === "uf"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground",
                  )}
                >
                  UF
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" aria-hidden />
            <Input
              className="h-11 pl-10"
              placeholder="Buscar por nombre, código o Isapre..."
              aria-label="Buscar por nombre, código o Isapre"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
            <aside className="space-y-5 rounded-2xl border border-border/70 bg-surface p-4 shadow-sm lg:sticky lg:top-24 lg:self-start">
              <h3 className="text-foreground text-sm font-semibold">Filtros</h3>

              <div className="space-y-3">
                <Label className="text-muted-foreground text-xs">Precio</Label>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  defaultValue={priceRange.max}
                  className="accent-primary w-full"
                  aria-label="Rango de precio máximo"
                />
                <div className="text-muted-foreground flex justify-between text-[11px]">
                  <span>{formatClp(priceRange.min)}</span>
                  <span>{formatClp(priceRange.max)}</span>
                </div>
                <button type="button" className="text-destructive text-xs font-medium hover:underline">
                  Limpiar filtros
                </button>
              </div>

              <div className="space-y-3">
                <Label className="text-muted-foreground text-xs">Filtrado por Isapre</Label>
                <ul className="space-y-2">
                  {isapreFilters.map((filter) => (
                    <li key={filter.id}>
                      <label
                        className={cn(
                          "flex items-center gap-2 text-sm",
                          filter.disabled ? "text-muted-foreground/70" : "text-foreground",
                        )}
                      >
                        <input
                          type="checkbox"
                          defaultChecked={filter.checked}
                          disabled={filter.disabled}
                          className="accent-primary h-4 w-4 rounded border-border"
                        />
                        {filter.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="space-y-4">
              {plans.map((plan) => (
                <PlanResultCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
