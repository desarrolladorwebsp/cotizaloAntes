"use client";

import { Plus, Search, X } from "lucide-react";
import { type FormEvent, useState } from "react";

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
import { buildCotizadorUrl, mapSortToOrden } from "@/lib/cotizador";
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
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [dependantAges, setDependantAges] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const handleAddDependant = () => {
    setDependantAges((current) => [...current, ""]);
  };

  const handleDependantChange = (index: number, value: string) => {
    setDependantAges((current) => current.map((item, i) => (i === index ? value : item)));
  };

  const handleRemoveDependant = (index: number) => {
    setDependantAges((current) => current.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const parsedAge = parseInt(age, 10);
    if (!Number.isFinite(parsedAge) || parsedAge < 0 || parsedAge > 120) {
      setFormError("Ingresa una edad válida entre 0 y 120 años.");
      return;
    }

    const cargas = dependantAges
      .map((value) => parseInt(value, 10))
      .filter((value) => Number.isFinite(value) && value >= 0 && value <= 120);

    if (dependantAges.some((value) => value.trim() !== "") && cargas.length !== dependantAges.length) {
      setFormError("Revisa las edades de los asegurados adicionales.");
      return;
    }

    const selectedIsapres = isapreFilters
      .filter((filter) => filter.checked && !filter.disabled)
      .map((filter) => filter.id);

    window.location.href = buildCotizadorUrl({
      region,
      edad: parsedAge,
      sexo: gender,
      ingreso: income.trim() || undefined,
      cargas: cargas.length > 0 ? cargas : undefined,
      auto: true,
      q: searchQuery.trim() || undefined,
      orden: mapSortToOrden(sortBy),
      moneda: currency === "uf" ? "uf" : "clp",
      ...(selectedIsapres.length > 0 ? { isapres: selectedIsapres } : {}),
    });
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

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border/70 bg-surface p-4 shadow-sm sm:p-5"
          >
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
                <Input
                  id="income"
                  name="income"
                  type="text"
                  inputMode="numeric"
                  placeholder="Ej: $1.200.000"
                  value={income}
                  onChange={(event) => setIncome(event.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="age">Edad</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min={0}
                  max={120}
                  placeholder="35"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  required
                />
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
                onClick={handleAddDependant}
                className="text-primary h-11 justify-start gap-1.5 px-0 text-sm font-medium hover:bg-transparent hover:text-primary-hover lg:mb-0.5 lg:self-end"
              >
                <Plus className="h-4 w-4" aria-hidden />
                Agregar asegurados
              </Button>

              <Button
                type="submit"
                className="h-11 rounded-full px-6 text-sm font-semibold shadow-glow lg:col-span-1"
              >
                Buscar mejor plan
              </Button>
            </div>

            {dependantAges.length > 0 ? (
              <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
                <p className="text-muted-foreground text-xs font-medium">Asegurados adicionales</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {dependantAges.map((dependantAge, index) => (
                    <div key={`dependant-${index}`} className="flex items-end gap-2">
                      <div className="flex-1 space-y-1.5">
                        <Label htmlFor={`dependant-age-${index}`}>Edad asegurado {index + 1}</Label>
                        <Input
                          id={`dependant-age-${index}`}
                          type="number"
                          min={0}
                          max={120}
                          placeholder="Ej: 8"
                          value={dependantAge}
                          onChange={(event) => handleDependantChange(index, event.target.value)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveDependant(index)}
                        aria-label={`Eliminar asegurado ${index + 1}`}
                        className="text-muted-foreground shrink-0"
                      >
                        <X className="h-4 w-4" aria-hidden />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {formError ? (
              <p className="text-destructive mt-4 text-sm" role="alert">
                {formError}
              </p>
            ) : null}
          </form>

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
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
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
