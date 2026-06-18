export function CotizadorIsapresBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/[0.04]" />
      <div className="bg-primary/6 absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-[#6b4a35]/[0.04] blur-3xl" />
    </div>
  );
}
