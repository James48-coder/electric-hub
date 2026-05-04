import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, Network, MessageSquare, ArrowRight, Zap, Shield, Gauge } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ВольтПро — Главная" },
      { name: "description", content: "Ваш помощник в электромонтаже: расчёты, схемы, консультации." },
    ],
  }),
  component: Index,
});

const TOOLS = [
  {
    to: "/calculators",
    icon: Calculator,
    title: "Калькуляторы",
    desc: "Сечение кабеля, падение напряжения, защита, заземление.",
    accent: "from-primary/30 to-primary/0",
  },
  {
    to: "/schemes",
    icon: Network,
    title: "Готовые схемы",
    desc: "Однолинейные, освещение, щиты — редактируй и экспортируй.",
    accent: "from-accent/30 to-accent/0",
  },
  {
    to: "/chat",
    icon: MessageSquare,
    title: "Чат с ИИ",
    desc: "Подскажет по ПУЭ, ГОСТ и поможет с расчётом на объекте.",
    accent: "from-primary/30 to-accent/20",
  },
] as const;

const STATS = [
  { icon: Zap, label: "Расчётов в день", value: "1 240+" },
  { icon: Shield, label: "Соответствие ПУЭ", value: "100%" },
  { icon: Gauge, label: "Среднее время", value: "< 8 сек" },
];

function Index() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      {/* HERO */}
      <section className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl animate-float" />

        <div className="relative max-w-2xl">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            MVP · Версия для профессионалов
          </span>
          <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Ваш помощник в электромонтаже:{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              расчёты, схемы, консультации
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Все инструменты электрика в одном месте — быстро, точно и под рукой даже на стройплощадке.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/calculators"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow transition hover:scale-[1.02] active:scale-[0.99]"
            >
              Начать расчёт <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/knowledge"
              className="neu-sm inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition hover:scale-[1.02]"
            >
              База знаний
            </Link>
          </div>
        </div>

        <div className="relative mt-10 grid grid-cols-3 gap-3">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="neu-sm rounded-2xl p-4">
                <Icon className="h-4 w-4 text-primary" />
                <div className="mt-2 text-lg font-bold sm:text-2xl">{s.value}</div>
                <div className="text-[11px] uppercase tracking-wide text-muted-foreground sm:text-xs">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* QUICK TOOLS */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Быстрые инструменты</h2>
            <p className="text-sm text-muted-foreground">Открывайте нужное в один клик.</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="group glass relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1 hover:glow"
              >
                <div
                  className={
                    "pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition group-hover:opacity-100 " +
                    t.accent
                  }
                />
                <div className="relative">
                  <div className="neu flex h-12 w-12 items-center justify-center rounded-2xl">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{t.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{t.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Открыть <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
