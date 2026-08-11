import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Lightbulb,
  Zap,
  Cpu,
  LayoutGrid,
  ArrowLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/schemes")({
  component: SchemesPage,
});

type SchemeItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: any;
  content: string[];
  rules: string[];
};

const SCHEMES: SchemeItem[] = [
  {
    id: "light-simple",
    title: "Обычный выключатель",
    category: "Освещение",
    description: "Базовая схема управления одной группой света.",
    icon: Lightbulb,
    content: [
      "Базовая схема подключения одноклавишного выключателя для управления светильником из одного места.",
      "От распределительной коробки к выключателю идет двужильный или трехжильный кабель. Согласно нормам ПУЭ, коммутироваться (разрываться) должен исключительно фазный проводник (L), а ноль (N) и заземление (PE) идут напрямую к светильнику."
    ],
    rules: [
      "Кабель для осветительных линий: ВВГнг-LS 3х1.5 мм²",
      "Защитный автомат: 10 А",
      "Строгое требование: разрыв фазы на выключателе"
    ]
  },
  {
    id: "light-two-gang",
    title: "Двухклавишный выключатель",
    category: "Освещение",
    description: "Управление двумя независимыми группами светильников из одной точки.",
    icon: Lightbulb,
    content: [
      "Позволяет раздельно включать две группы ламп (например, рожки люстры) с одного общего двухклавишного выключателя.",
      "В коробку выключателя приходит фаза от щита и уходят два фазных провода на каждую из групп света."
    ],
    rules: [
      "Кабель от выключателя к коробке: 4-жильный (или два кабеля 3х1.5)",
      "Защитный автомат: 10 А"
    ]
  },
  {
    id: "light-3way",
    title: "Проходные выключатели",
    category: "Освещение",
    description: "Схема управления одной группой света из 2-х разных мест.",
    icon: Lightbulb,
    content: [
      "Используется в длинных коридорах, проходных комнатах, на лестницах и в спальнях (у входа и у кровати).",
      "Используются два специальных переключателя на два направления (проходных). Между ними прокладывается линия из двух жил (перемычки)."
    ],
    rules: [
      "Кабели между переключателями: 3х1.5 мм² (или пара двухжильных)",
      "Фаза заходит на общий контакт первого переключателя, а со второго уходит на лампу"
    ]
  },
  {
    id: "sockets-loop",
    title: "Розеточная группа",
    category: "Силовые",
    description: "Подключение блока розеток или линии розеток.",
    icon: Zap,
    content: [
      "Стандартная схема разводки розеточных линий по комнатам.",
      "Каждая розетка защищена автоматическим выключателем. Запрещено нагружать шлейф из розеток суммарно выше допустимого тока кабеля."
    ],
    rules: [
      "Кабель для розеток: ВВГнг-LS 3х2.5 мм² (медь обязательна)",
      "Защитный автомат: 16 А",
      "Обязательное наличие заземляющего контакта (PE)"
    ]
  },
  {
    id: "motor-delta",
    title: "Двигатель (Треугольник)",
    category: "Двигатели",
    description: "Схема подключения трехфазного асинхронного двигателя в сеть 220В.",
    icon: Cpu,
    content: [
      "Позволяет запустить мощный 3Ф двигатель от обычной однофазной сети 220В с помощью фазосдвигающего рабочего конденсатора.",
      "Схема «Треугольник» дает максимальную мощность на валу (около 70-75% от номинала)."
    ],
    rules: [
      "Расчет рабочей емкости: примерно 66 мкФ на 1 кВт мощности",
      "Рабочее напряжение конденсаторов: не менее 400-450 В переменного тока (AC)"
    ]
  },
  {
    id: "shield-assembly",
    title: "Сборка распределительного щита",
    category: "Щиты",
    description: "Типовая компоновка модульного оборудования в щите.",
    icon: LayoutGrid,
    content: [
      "Правильная организация распределительного щита квартиры или дома.",
      "Порядок сборки сверху вниз: вводные клеммы / рубильник -> вводной автомат -> реле напряжения (УЗМ) -> противопожарное УЗО -> групповые УЗО (дифавтоматы) -> линейные автоматические выключатели."
    ],
    rules: [
      "Обязательное разделение шин N (ноль) и PE (земля)",
      "Использование гребенчатых шин (кросс-модулей) для надежного соединения автоматов"
    ]
  },
];

export function SchemesPage() {
  const [selectedScheme, setSelectedScheme] = useState<SchemeItem | null>(null);

  if (selectedScheme) {
    return (
      <div className="mx-auto w-full max-w-4xl py-6 space-y-6 text-slate-100">
        <Button variant="ghost" size="sm" onClick={() => setSelectedScheme(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку схем
        </Button>
        <header className="space-y-1">
          <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
            {selectedScheme.category}
          </span>
          <h1 className="text-3xl font-bold pt-2">{selectedScheme.title}</h1>
          <p className="text-muted-foreground">{selectedScheme.description}</p>
        </header>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            {selectedScheme.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="p-4 bg-blue-950/40 border border-blue-900/50 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 font-bold text-blue-300 text-sm">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Технические требования и нормы</span>
            </div>
            <ul className="space-y-2 text-xs text-blue-200/90">
              {selectedScheme.rules.map((rule, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl py-6 space-y-8 text-slate-100">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Электрические схемы</h1>
        <p className="text-muted-foreground">Визуальные руководства и схемы электромонтажа</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SCHEMES.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => setSelectedScheme(scheme)}
            className="group glass neu rounded-2xl p-6 text-left border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/70 transition-all hover:-translate-y-0.5 hover:shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 grid place-items-center">
                  <scheme.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  {scheme.category}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg">{scheme.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{scheme.description}</p>
              </div>
            </div>

            <div className="flex items-center text-sm font-semibold text-blue-400 group-hover:translate-x-1 transition-transform pt-4 mt-4 border-t border-slate-800/80">
              Открыть схему <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
