import { useState } from "react";

export function LanguageToggle() {
  const [lang, setLang] = useState<"RU" | "EN">("RU");
  return (
    <div className="glass inline-flex items-center rounded-full p-1 text-xs font-semibold">
      {(["RU", "EN"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={
            "rounded-full px-3 py-1.5 transition " +
            (lang === l
              ? "bg-primary text-primary-foreground glow"
              : "text-muted-foreground hover:text-foreground")
          }
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
