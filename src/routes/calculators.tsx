import { createFileRoute } from "@tanstack/react-router";
import { CableCalculator } from "@/components/cable-calculator";

export const Route = createFileRoute("/calculators")({
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto w-full max-w-6xl py-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Калькуляторы</h1>
        <p className="text-muted-foreground">
          Инженерные расчёты по нормам ПУЭ — быстро и наглядно.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Калькулятор сечения кабеля</h2>
        <CableCalculator />
      </section>
    </div>
  );
}
