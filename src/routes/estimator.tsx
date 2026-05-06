import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EstimatePaper } from "@/components/estimate-paper";

export const Route = createFileRoute("/estimator")({
  component: Page,
});

type Msg = { role: "user" | "ai"; text: string };

function Page() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Опишите объект и состав работ — я сформирую предварительную смету.",
    },
    { role: "user", text: "Двухкомнатная квартира, полная замена проводки." },
    {
      role: "ai",
      text: "Готово. Справа — черновик сметы. Уточните количество розеток или материал кабеля при необходимости.",
    },
  ]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "ai", text: "Принято. Обновляю смету в правой панели." },
      ]);
    }, 400);
  };

  return (
    <div className="mx-auto w-full max-w-7xl py-6">
      <header className="mb-6 space-y-2">
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <Sparkles className="h-7 w-7 text-primary" />
          ИИ-сметчик
        </h1>
        <p className="text-muted-foreground">
          Опишите задачу — получите готовую смету в формате печатного документа.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* Chat panel */}
        <div className="glass neu flex h-[78vh] flex-col rounded-3xl p-4 md:p-6">
          <div className="flex items-center gap-2 border-b border-border/40 pb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Диалог с ИИ</h2>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm " +
                  (m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "neu-sm bg-card/60")
                }
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Опишите объект, материалы, сроки…"
              className="neu-inset h-11 rounded-xl"
            />
            <button
              onClick={send}
              className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground glow transition active:scale-95"
              aria-label="Отправить"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right pane: A4 paper */}
        <div className="glass neu rounded-3xl p-3 md:p-4">
          <div className="mb-3 flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FileText className="h-4 w-4 text-primary" />
              Документ · Смета
            </div>
            <span className="text-xs text-muted-foreground">A4 · предпросмотр</span>
          </div>
          <div className="rounded-2xl bg-black/10 dark:bg-black/30">
            <EstimatePaper />
          </div>
        </div>
      </div>
    </div>
  );
}
