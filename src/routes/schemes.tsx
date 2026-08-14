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
    category: "Управление светом",
    description: "Базовая схема управления одной группой света.",
    icon: Lightbulb,
    content: ["Базовая схема подключения одноклавишного выключателя. Фаза разрывается выключателем, ноль и заземление идут напрямую к светильнику."],
    rules: ["Кабель: ВВГнг-LS 3х1.5 мм2", "Автомат: 10 А", "Обязателен разрыв фазы"]
  },
  {
    id: "light-two-gang",
    title: "Двухклавишный выключатель",
    category: "Управление светом",
    description: "Управление двумя группами освещения.",
    icon: Lightbulb,
    content: ["Управление двумя независимыми группами светильников из одной точки."],
    rules: ["Кабель: 4-жильный", "Автомат: 10 А"]
  },
  {
    id: "light-3way",
    title: "Проходные выключатели",
    category: "Управление светом",
    description: "Управление из 2-х мест.",
    icon: Lightbulb,
    content: ["Схема управления одной группой света из двух разных мест (коридоры, лестницы)."],
    rules: ["Кабели между выключателями: 3х1.5 мм2", "Фаза заходит на первый, со второго уходит на лампу"]
  },
  {
    id: "light-cross",
    title: "Проходные + перекрестные",
    category: "Управление светом",
    description: "Управление из 3-х и более мест.",
    icon: Lightbulb,
    content: ["Схема управления светом из трех и более точек. Используются два проходных и один или несколько перекрестных выключателей."],
    rules: ["Требуется 4-жильный кабель между переключателями", "Сложная коммутация в коробках"]
  },
  {
    id: "sockets-loop",
    title: "Группа розеток (шлейф/коробка)",
    category: "Силовые и розеточные",
    description: "Подключение группы розеток.",
    icon: Zap,
    content: ["Сравнение подключения розеток шлейфом (от розетки к розетке) и через распаячные коробки. Соединение через коробки более надежно и долговечно."],
    rules: ["Кабель: ВВГнг-LS 3х2.5 мм2", "Автомат: 16 А", "Запрет на нагрузку шлейфа свыше 16 А"]
  },
  {
    id: "appliance-connection",
    title: "Стационарная техника",
    category: "Силовые и розеточные",
    description: "Подключение плит и варочных панелей.",
    icon: Zap,
    content: ["Подключение мощных электроприборов (варочные панели, плиты). Требует выделенной линии от щита."],
    rules: ["Кабель: ВВГнг-LS 3х4 или 3х6 мм2", "Автомат: 25-32 А", "Обязательное заземление"]
  },
  {
    id: "motor-delta",
    title: "Звезда и Треугольник",
    category: "Электродвигатели",
    description: "Подключение 3Ф двигателя в 220В.",
    icon: Cpu,
    content: ["Подключение 3Ф асинхронного двигателя в однофазную сеть 220В с помощью фазосдвигающих конденсаторов."],
    rules: ["Конденсатор: ~66 мкФ на 1 кВт", "Напряжение: 400-450 В AC"]
  },
  {
    id: "motor-revers",
    title: "Реверсивная схема",
    category: "Электродвигатели",
    description: "Схема изменения направления вращения.",
    icon: Cpu,
    content: ["Организация реверса электродвигателя с помощью переключателя фаз или пусковой аппаратуры."],
    rules: ["Исключить одновременное срабатывание (механическая блокировка)", "Правильный выбор контакторов"]
  },
  {
    id: "shield-assembly",
    title: "Сборка щита",
    category: "Щитовое",
    description: "Компоновка оборудования в щите.",
    icon: LayoutGrid,
    content: ["Порядок монтажа: Вводной автомат -> Реле напряжения -> УЗО -> Групповые автоматы -> Шины."],
    rules: ["Разделение N и PE", "Использование гребенчатых шин"]
  },
];

export function SchemesPage() {
  const [selectedScheme, setSelectedScheme] = useState<SchemeItem | null>(null);

  if (selectedScheme) {
    return (
      <div className="mx-auto w-full max-w-4xl py-6 space-y-6 text-foreground animate-in fade-in duration-300">
        <Button variant="ghost" size="sm" onClick={() => setSelectedScheme(null)} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> К списку схем
        </Button>
        <header className="space-y-1">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
            {selectedScheme.category}
          </span>
          <h1 className="text-3xl font-bold pt-2">{selectedScheme.title}</h1>
          <p className="text-muted-foreground">{selectedScheme.description}</p>
        </header>

        <div className="bg-card border border-border rounded-[var(--radius)] p-6 md:p-8 space-y-6 shadow-sm">
          <div className="space-y-4 text-sm text-foreground leading-relaxed">
            {selectedScheme.content.map((p, idx) => <p key={idx}>{p}</p>)}
          </div>

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 font-bold text-primary text-sm">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Технические требования и нормы</span>
            </div>
            <ul className="space-y-2 text-xs text-foreground/80">
              {selectedScheme.rules.map((rule, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
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
    <div className="mx-auto w-full max-w-6xl py-6 space-y-8 text-foreground animate-in fade-in duration-500">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Описание схем</h1>
        <p className="text-muted-foreground">Практические руководства и правила электромонтажа</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SCHEMES.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => setSelectedScheme(scheme)}
            className="group rounded-[var(--radius)] p-6 text-left border border-border bg-card hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary grid place-items-center">
                  <scheme.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  {scheme.category}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{scheme.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{scheme.description}</p>
              </div>
            </div>

            <div className="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform pt-4 mt-4 border-t border-border">
              Описание схемы <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
