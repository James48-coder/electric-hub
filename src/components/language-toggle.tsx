import React, { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("RU");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLanguage = (selected: string) => {
    setLang(selected);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 items-center gap-2 rounded-full border border-border bg-card px-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        {lang}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 rounded-[var(--radius)] border border-border bg-card p-1 shadow-lg animate-in fade-in slide-in-from-top-2 z-50">
          <button
            onClick={() => selectLanguage("RU")}
            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
              lang === "RU" ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-muted"
            }`}
          >
            Русский (RU)
          </button>
          <button
            onClick={() => selectLanguage("EN")}
            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
              lang === "EN" ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-muted"
            }`}
          >
            English (EN)
          </button>
        </div>
      )}
    </div>
  );
}
