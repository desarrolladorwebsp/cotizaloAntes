"use client";

import { Plus, X } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";

import { CotizadorIsapresBackground } from "@/components/sections/cotizador-isapres/cotizador-isapres-background";
import { PlanResultCard } from "@/components/sections/cotizador-isapres/plan-result-card";
import { SolicitarCriteriaAlert } from "@/components/sections/cotizador-isapres/solicitar-criteria-alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cotizadorIsapresConfig } from "@/constants/cotizador-isapres";
import { cotizadorUi } from "@/constants/cotizador-ui";
import { useCotizadorPlans } from "@/hooks/use-cotizador-plans";
import { useEconomicIndicators } from "@/hooks/use-economic-indicators";
import { buildCotizadorUrl, mapSortToOrden } from "@/lib/cotizador";
import { cn } from "@/lib/utils";
import {
  getSolicitarCriteriaValidationMessage,
  validateSearchCriteria,
} from "@/lib/validation/solicitar-criteria";
import type { CotizadorPlan } from "@/types/cotizador-plan";

const {
  sectionId,
  eyebrow,
  title,
  resultsSummary,
  regions,
  genders,
  sortOptions,
  isapreFilters,
  priceRange,
} = cotizadorIsapresConfig;

const DEFAULT_UF_TO_CLP = 39_000;

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
  const [dependantAges, setDependantAges] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittingPlanId, setSubmittingPlanId] = useState<string | null>(null);
  const [solicitarAlertOpen, setSolicitarAlertOpen] = useState(false);
  const [solicitarAlertMessage, setSolicitarAlertMessage] = useState("");
  const [isapreSelection, setIsapreSelection] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      isapreFilters.map((filter) => [filter.id, !filter.disabled]),
    ),
  );
  const criteriaFormRef = useRef<HTMLFormElement>(null);

  const { data: indicators } = useEconomicIndicators();
  const ufToClp = indicators?.uf ?? DEFAULT_UF_TO_CLP;
  const { data: plans = [], isLoading: plansLoading, error: plansError } = useCotizadorPlans(ufToClp);

  const criteriaInput = {
    region,
    income,
    age,
    gender,
    dependantAges,
  };

  function focusCriteriaForm(message?: string) {
    if (message) setFormError(message);
    criteriaFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showSolicitarCriteriaAlert(message: string) {
    setSolicitarAlertMessage(message);
    setSolicitarAlertOpen(true);
    focusCriteriaForm();
  }

  const handleAddDependant = () => {
    setDependantAges((current) => [...current, ""]);
  };

  const handleDependantChange = (index: number, value: string) => {
    setDependantAges((current) => current.map((item, i) => (i === index ? value : item)));
  };

  const handleRemoveDependant = (index: number) => {
    setDependantAges((current) => current.filter((_, i) => i !== index));
  };

  const getCotizanteData = () => {
    const parsedAge = parseInt(age, 10);
    const cargas = dependantAges
      .map((value) => parseInt(value, 10))
      .filter((value) => Number.isFinite(value) && value >= 0 && value <= 120);

    return {
      region,
      edad: parsedAge,
      sexo: gender,
      ingreso: income.trim() || undefined,
      cargas: cargas.length > 0 ? cargas : undefined,
    };
  };

  const buildFormCotizadorUrl = (options?: { plan?: CotizadorPlan }) => {
    const cotizante = getCotizanteData();

    const selectedIsapres = isapreFilters
      .filter((filter) => isapreSelection[filter.id] && !filter.disabled)
      .map((filter) => filter.id);

    const plan = options?.plan;
    const planIsapreId = plan
      ? isapreFilters.find((filter) => filter.label === plan.provider)?.id
      : undefined;

    const isapres =
      planIsapreId && !selectedIsapres.includes(planIsapreId)
        ? [...selectedIsapres, planIsapreId]
        : selectedIsapres;

    return buildCotizadorUrl({
      ...cotizante,
      auto: true,
      ...(plan?.code ? { q: plan.code } : {}),
      orden: mapSortToOrden(sortBy),
      moneda: currency === "uf" ? "uf" : "clp",
      ...(isapres.length > 0 ? { isapres } : {}),
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const validationError = validateSearchCriteria(criteriaInput);
    if (validationError) {
      focusCriteriaForm(validationError);
      return;
    }

    window.location.href = buildFormCotizadorUrl();
  };

  const handleSolicitarPlan = async (plan: CotizadorPlan) => {
    setFormError(null);

    const validationError = getSolicitarCriteriaValidationMessage(criteriaInput);
    if (validationError) {
      showSolicitarCriteriaAlert(validationError);
      return;
    }

    setSubmittingPlanId(plan.id);

    try {
      const response = await fetch("/api/cotizador/solicitar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: plan.code,
          ...getCotizanteData(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        url?: string;
        error?: string;
      } | null;

      if (!response.ok || !payload?.url) {
        throw new Error(payload?.error ?? "No se pudo abrir la solicitud del plan.");
      }

      window.location.href = payload.url;
    } catch (error) {
      setSubmittingPlanId(null);
      showSolicitarCriteriaAlert(
        error instanceof Error
          ? error.message
          : "No se pudo abrir la solicitud del plan. Intenta nuevamente.",
      );
    }
  };

  const displayedCount = plans.length;

  return (
    <section
      id={sectionId}
      data-cotizador-brand
      className={cn("relative w-full overflow-hidden py-16 sm:py-20 md:py-28", cotizadorUi.canvas)}
      aria-labelledby="cotizador-isapres-title"
    >
      <CotizadorIsapresBackground />

      <Container size="2xl" padding="default" className="relative z-10">
        <div className="space-y-5">
          <header className="motion-safe-fade-in space-y-2">
            <p className={cotizadorUi.sectionEyebrow}>{eyebrow}</p>
            {asPage ? (
              <h1 id="cotizador-isapres-title" className={cotizadorUi.sectionTitle}>
                {title.prefix} {title.highlight}
              </h1>
            ) : (
              <h2 id="cotizador-isapres-title" className={cotizadorUi.sectionTitle}>
                {title.prefix} {title.highlight}
              </h2>
            )}
          </header>

          <form ref={criteriaFormRef} onSubmit={handleSubmit} className={cotizadorUi.criteriaPanel}>
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
                className={cn(
                  "h-11 rounded-full px-6 text-sm font-bold shadow-[var(--cot-shadow-cta)] lg:col-span-1",
                  cotizadorUi.cta,
                )}
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
              <p className="mt-4 text-sm text-red-600" role="alert">
                {formError}
              </p>
            ) : null}
          </form>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="rounded-full border border-[var(--cot-border)] bg-white px-3 py-1 text-xs font-semibold text-[var(--cot-primary-dark)] shadow-sm">
                Mostrando {displayedCount} de {resultsSummary.total}
              </Badge>
              <p className={cn("text-sm", cotizadorUi.mutedText)}>{resultsSummary.subtitle}</p>
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

              <div className="bg-[var(--cot-surface-hover)] flex rounded-full p-0.5">
                <button
                  type="button"
                  onClick={() => setCurrency("pesos")}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                    currency === "pesos"
                      ? "bg-[var(--cot-primary)] text-[var(--cot-primary-foreground)] shadow-sm"
                      : cotizadorUi.mutedText,
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
                      ? "bg-[var(--cot-primary)] text-[var(--cot-primary-foreground)] shadow-sm"
                      : cotizadorUi.mutedText,
                  )}
                >
                  UF
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
            <aside className={cotizadorUi.filterPanel}>
              <h3 className="text-sm font-semibold text-[var(--cot-primary-dark)]">Filtros</h3>

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
                          checked={isapreSelection[filter.id] ?? false}
                          disabled={filter.disabled}
                          onChange={(event) =>
                            setIsapreSelection((current) => ({
                              ...current,
                              [filter.id]: event.target.checked,
                            }))
                          }
                          className="accent-primary h-4 w-4 rounded border-border"
                        />
                        {filter.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="flex flex-col gap-4">
              {plansLoading ? (
                <p className={cn("rounded-xl border bg-white px-6 py-10 text-center text-sm", cotizadorUi.border)}>
                  Cargando planes…
                </p>
              ) : plansError ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center text-sm text-red-700" role="alert">
                  No se pudieron cargar los planes. Intenta recargar la página.
                </p>
              ) : (
                plans.map((plan) => (
                  <PlanResultCard
                    key={plan.id}
                    plan={plan}
                    onSolicitar={handleSolicitarPlan}
                    isSubmitting={submittingPlanId === plan.id}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </Container>

      <SolicitarCriteriaAlert
        open={solicitarAlertOpen}
        message={solicitarAlertMessage}
        onOpenChange={setSolicitarAlertOpen}
        onConfirm={() => focusCriteriaForm()}
      />
    </section>
  );
}
