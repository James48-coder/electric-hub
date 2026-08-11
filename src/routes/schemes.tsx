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
      "Согласно нормам ПУЭ, коммутироваться (разрываться) должен исключительно фазный проводник (L), а ноль (N) и заземление (PE) идут напрямую к светильнику."
    ],
    rules: [
      "Кабель для осветительных линий: ВВГнг-LS 3х1.5 мм2",
      "Защитный автомат: 10 А",
      "Строгое требование: разрыв фазы на выключателе"
    ]
  },
  {
    id: "light-two-gang",
    title: "Двухклавишный выключатель",
    category: "Освещение",
    description: "Управление двумя группами светильников.",
    icon: Lightbulb,
    content: [
      "Управление двумя группами ламп с одного двухклавишного выключателя.",
      "В коробку выключателя приходит фаза и уходят два фазных провода на каждую из групп света."
    ],
    rules: ["Кабель: 4-жильный", "Автомат: 10 А"]
  },
  {
    id: "light-3way",
    title: "Проходные выключатели",
    category: "Освещение",
    description: "Управление из 2-х мест.",
    icon: Lightbulb,
    content: ["Используются два переключателя на два направления. Между ними прокладывается линия из двух жил (перемычки)."],
    rules: ["Кабели: 3х1.5 мм2", "Фаза заходит на первый, со второго уходит на лампу"]
  },
  {
    id: "sockets-loop",
    title: "Розеточная группа",
    category: "Силовые",
    description: "Подключение блока розеток.",
    icon: Zap,
    content: ["Стандартная схема разводки розеточных линий. Каждая розетка защищена автоматом."],
    rules: ["Кабель: 3х2.5 мм2 (медь)", "Автомат: 16 А", "Наличие заземления (PE) обязательно"]
  },
  {
    id: "motor-delta",
    title: "Двигатель (Треугольник)",
    category: "Двигатели",
    description: "Подключение 3Ф двигателя в 220В.",
    icon: Cpu,
    content: ["Подключение двигателя 3Ф в 220В через конденсатор."],
    rules: ["Емкость: ~66 мкФ на 1 кВт", "Напряжение конденсатора: 400-450 В"]
  },
  {
    id: "shield-assembly",
    title: "Сборка щита",
    category: "Щиты",
    description: "Компоновка модульного оборудования.",
    icon: LayoutGrid,
    content: ["Типовая сборка: Ввод -> Реле напряжения -> УЗО -> Группы."],
    rules: ["Разделение шин N и PE", "Использование гребенчатых шин"]
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
            {selectedScheme.content.map((p, idx) => <p key={idx}>{p}</p>)}
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
              Описание схемы <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
