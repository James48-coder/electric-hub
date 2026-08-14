import React from "react";
import { Sparkles } from "lucide-react";

interface ProCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function ProCard({ children, title, description, className = "" }: ProCardProps) {
  return (
    <div className={`relative rounded-[var(--radius)] p-[1px] overflow-hidden group ${className}`}>
      {/* Неоновый переливающийся контур для Pro версии */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-50 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
      
      <div className="relative h-full w-full rounded-[var(--radius)] bg-card p-6 flex flex-col justify-between">
        {/* Шапка карточки с бэйджем Pro */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              {title}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary/20 text-primary border border-primary/30">
                <Sparkles className="w-3 h-3" /> 3.1 Pro
              </span>
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        </div>

        {/* Основной контент */}
        <div className="relative z-10 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
