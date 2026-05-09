import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  ShieldAlert,
  FileText,
  Zap,
  Cable,
  Flame,
  Plug,
  Building2,
  Wrench,
  ArrowRight,
  Sparkles,
  Library,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "База знаний — нормы ПУЭ, ГОСТ, СНиП | ВольтПро" },
      {
        name: "description",
        content:
          "Поиск по нормативным документам для электриков: ПУЭ, ГОСТ, СНиП. Заземление, кабельные линии, защита.",
      },
      { property: "og:title", content: "База знаний — ВольтПро" },
      {
        property: "og:description",
        content: "Удобная библиотека норм и правил для электромонтажа.",
      },
    ],
  }),
  component: Page,
});

type Tag = "ПУЭ" | "ГОСТ" | "СНиП" | "Заземление" | "Кабельные линии" | "Пожарная безопасность";

type Doc = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: Tag[];
  popular?: boolean;
};

const DOCS: Doc[] = [
  {
    id: "pue7",
    title: "ПУЭ 7-е издание",
    description: "Правила устройства электроустановок — основной документ для проектирования и монтажа.",
    icon: BookOpen,
    tags: ["ПУЭ"],
    popular: true,
  },
  {
    id: "gost-31565",
    title: "ГОСТ 31565-2012",
    description: "Требования пожарной безопасности к кабельным изделиям, классы пожарной опасности.",
    icon: Flame,
    tags: ["ГОСТ", "Кабельные линии", "Пожарная безопасность"],
    popular: true,
  },
  {
    id: "snip-31-110",
    title: "СП 256.1325800.2016",
    description: "Электроустановки жилых и общественных зданий — правила проектирования и монтажа.",
    icon: Building2,
    tags: ["СНиП"],
    popular: true,
  },
  {
    id: "grounding",
    title: "Заземление и зануление",
    description: "Системы TN-C, TN-S, TN-C-S, TT, IT. Сопротивление контура и проверка.",
    icon: ShieldAlert,
    tags: ["ПУЭ", "Заземление"],
    popular: true,
  },
  {
    id: "gost-r-50571",
    title: "ГОСТ Р 50571",
    description: "Электроустановки низковольтные. Защита от поражения электрическим током.",
    icon: ShieldAlert,
    tags: ["ГОСТ"],
  },
  {
    id: "cable-lines",
    title: "Кабельные линии до 1 кВ",
    description: "Прокладка, выбор сечения, защита от КЗ и перегрузок согласно ПУЭ гл. 2.1.",
    icon: Cable,
    tags: ["ПУЭ", "Кабельные линии"],
  },
  {
    id: "snip-3-05",
    title: "СНиП 3.05.06-85",
    description: "Электротехнические устройства — правила производства и приёмки работ.",
    icon: Wrench,
    tags: ["СНиП"],
  },
  {
    id: "gost-r-50462",
    title: "ГОСТ Р 50462-2009",
    description: "Идентификация проводников по цветам и буквенно-цифровым обозначениям.",
    icon: FileText,
    tags: ["ГОСТ", "Кабельные линии"],
  },
  {
    id: "rcd",
    title: "УЗО и дифавтоматы",
    description: "Выбор номинала, селективность, требования ПУЭ гл. 7.1 для жилых помещений.",
    icon: Plug,
    tags: ["ПУЭ"],
  },
  {
    id: "lightning",
    title: "СО 153-34.21.122-2003",
    description: "Инструкция по устройству молниезащиты зданий и промышленных коммуникаций.",
    icon: Zap,
    tags: ["СНиП", "Заземление"],
  },
  {
    id: "gost-iec-60364",
    title: "ГОСТ IEC 60364",
    description: "Серия стандартов на электроустановки зданий, гармонизированная с МЭК.",
    icon: FileText,
    tags: ["ГОСТ"],
  },
  {
    id: "fire-safety",
    title: "ФЗ-123 «Технический регламент»",
    description: "Требования пожарной безопасности к электропроводке и распределительным сетям.",
    icon: Flame,
    tags: ["Пожарная безопасность"],
  },
];

const FILTERS: ("Все" | Tag)[] = [
  "Все",
  "ПУЭ",
  "ГОСТ",
  "СНиП",
  "Заземление",
  "Кабельные линии",
  "Пожарная безопасность",
];

function Page() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Все");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DOCS.filter((d) => {
      const matchesFilter = filter === "Все" || d.tags.includes(filter as Tag);
      if (!matchesFilter) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, filter]);

  const popular = filtered.filter((d) => d.popular);
  const all = filtered;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 py-6">
      {/* Hero / Search */}
      <section className="glass relative overflow-hidden rounded-3xl p-6 md:p-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="neu flex h-12 w-12 items-center justify-center rounded-2xl">
            <Library className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">База знаний</h1>
            <p className="text-sm text-muted-foreground">Нормы, правила и стандарты под рукой</p>
          </div>
        </div>

        <div className="neu-inset flex items-center gap-3 rounded-2xl px-4 py-3 md:px-5 md:py-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по нормам и правилам..."
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-lg"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="rounded-lg px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Очистить
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={
                  "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 " +
                  (active
                    ? "bg-primary text-primary-foreground glow scale-[1.03]"
                    : "neu-sm text-foreground/85 hover:scale-[1.03] hover:text-primary")
                }
              >
                {f}
              </button>
            );
          })}
        </div>
      </section>

      {/* Frequently searched */}
      {popular.length > 0 && (
        <section>
          <SectionHeader icon={Sparkles} title="Часто ищут" subtitle="Документы, к которым обращаются чаще всего" />
          <DocGrid docs={popular} />
        </section>
      )}

      {/* Full database */}
      <section>
        <SectionHeader
          icon={Library}
          title="Полная база"
          subtitle={`${all.length} ${pluralize(all.length, ["документ", "документа", "документов"])}`}
        />
        {all.length === 0 ? (
          <div className="neu-inset rounded-2xl p-10 text-center text-muted-foreground">
            Ничего не найдено. Попробуйте изменить запрос или фильтр.
          </div>
        ) : (
          <DocGrid docs={all} />
        )}
      </section>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="neu-sm flex h-10 w-10 items-center justify-center rounded-xl text-accent">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function DocGrid({ docs }: { docs: Doc[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {docs.map((d) => (
        <DocCard key={d.id} doc={d} />
      ))}
    </div>
  );
}

function DocCard({ doc }: { doc: Doc }) {
  const Icon = doc.icon;
  return (
    <button
      type="button"
      className="group neu relative flex h-full flex-col items-start rounded-2xl p-5 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_var(--color-primary)]"
    >
      <div className="neu-sm mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-primary transition-colors duration-300 group-hover:text-accent">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="text-base font-bold leading-snug">{doc.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{doc.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {doc.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex w-full items-center justify-between pt-3 border-t border-border/60">
        <span className="text-sm font-semibold text-primary">Читать</span>
        <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </button>
  );
}

function pluralize(n: number, forms: [string, string, string]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}
