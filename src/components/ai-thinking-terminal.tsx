import React, { useState, useEffect } from "react";
import { Terminal, CheckCircle2 } from "lucide-react";

interface AIThinkingTerminalProps {
  onComplete?: () => void;
}

const steps = [
  "Инициализация нейросети VoltPro 3.1...",
  "Анализ вводных параметров и ГОСТов...",
  "Проверка сечений кабеля по ПУЭ-7...",
  "Расчет падения напряжения и токов КЗ...",
  "Финальная генерация сметы завершена."
];

export function AIThinkingTerminal({ onComplete }: AIThinkingTerminalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <div className="rounded-[var(--radius)] border border-border bg-card p-4 font-mono text-xs shadow-sm overflow-hidden relative">
      {/* Шапка терминала */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border text-muted-foreground">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary animate-pulse" />
          <span className="font-bold uppercase tracking-wider text-foreground">VoltPro AI Terminal</span>
        </div>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/60 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/60 inline-block" />
        </div>
      </div>

      {/* Вывод строк процесса */}
      <div className="space-y-2 py-2">
        {steps.map((step, index) => {
          if (index > currentStep) return null;
          const isLast = index === currentStep;
          const isDone = index < currentStep;

          return (
            <div key={index} className="flex items-center gap-2 animate-fadeIn">
              {isDone ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-primary animate-ping shrink-0" />
              )}
              <span className={isLast && !isDone ? "text-primary font-semibold animate-pulse" : "text-muted-foreground"}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
