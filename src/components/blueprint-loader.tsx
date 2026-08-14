import React from "react";

interface BlueprintLoaderProps {
  text?: string;
}

export function BlueprintLoader({ text = "Анализ параметров цепи..." }: BlueprintLoaderProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-[var(--radius)] border border-primary/30 bg-card p-6 shadow-sm">
      {/* Тонкая сетка чертежа на фоне */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />
      
      <div className="relative z-10 flex flex-col items-center justify-center space-y-4 py-8">
        {/* Пульсирующий технический значок */}
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-primary bg-primary/10 text-primary animate-pulse">
          <div className="absolute inset-0 rounded-xl border border-primary animate-ping opacity-25" />
          <svg className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>

        {/* Текст процесса */}
        <div className="text-center space-y-1">
          <div className="text-sm font-semibold tracking-wider uppercase text-primary">
            Система 3.1 Pro Active
          </div>
          <div className="text-xs text-muted-foreground animate-pulse">
            {text}
          </div>
        </div>

        {/* Линии чертежной прогрессии */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary animate-[shimmer_2s_infinite]" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}
