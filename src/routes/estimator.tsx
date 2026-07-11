import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, FileText, Building2, Wallet, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EstimatePaper } from "@/components/estimate-paper";
import { SmartRegionSelector } from "@/components/smart-region-selector";

export const Route = createFileRoute("/estimator")({
  component: Page,
});

type Msg = { role: "user" | "ai"; text: string };
type EstimateItem = { name: string; unit: string; qty: number; price: number };

const REGIONS_DEFAULT = "Москва";
const OBJECT_TYPES = ["Квартира/Новостройка", "Вторичка", "Частный дом", "Коммерция"];

const WORKER_API_URL = "https://ai-estimator-api.james3001davis.workers.dev";

function Page() {
  const [input, setInput] = useState("");
  const [region, setRegion] = useState<string>(REGIONS_DEFAULT);
  const [objectType, setObjectType] = useState<string>("Квартира/Новостройка");
  const [useMyPrices, setUseMyPrices] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [estimateData, setEstimateData] = useState<EstimateItem[] | null>(null);

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Опишите объект и состав работ — я сформирую предварительную смету.",
    },
  ]);

  const send = async () => {
    if (!input.trim() || isLoading) return;
    
    const userText = input;
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(WORKER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) throw new Error("Ошибка сети");

      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setEstimateData(data);
        setMessages((m) => [...m, { role: "ai", text: "Смета готова! Документ обновлен ниже." }]);
      } else {
        throw new Error("Неверный формат ответа");
      }
    } catch (error) {
      console.error(error);
      setMessages((m) => [...m, { role: "ai", text: "Произошла ошибка при составлении сметы. Попробуйте описать задачу иначе." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden pb-16">
      <div className="mx-auto w-full max-w-4xl px-4 py-6">
        <header className="mb-8 space-y-2">
          <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <Sparkles className="h-8 w-8 text-primary" />
            ИИ-сметчик
          </h1>
          <p className="text-muted-foreground text-base">
            Опишите задачу — получите готовую смету в формате печатного документа.
          </p>
        </header>

        <div className="flex flex-col gap-8">
          {/* 1. Блок: Настройки сметы */}
          <div className="glass neu flex flex-col rounded-3xl p-5 md:p-6 border border-border/30">
            <div className="mb-5 flex items-center gap-2.5 border-b border-border/40 pb-3.5">
              <FileText className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Настройки сметы</h2>
            </div>
            
            <div className="space-y-5">
              <SmartRegionSelector value={region} onChange={setRegion} />
              
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                  <Building2 className="h-3.5 w-3.5" /> Тип объекта
                </label>
                <Select value={objectType} onValueChange={setObjectType}>
                  <SelectTrigger className="neu-sm h-10 rounded-xl border-0 bg-card/60 text-sm">
                    <SelectValue placeholder="Тип объекта" />
                  </SelectTrigger>
                  <SelectContent>
                    {OBJECT_TYPES.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-card/40 px-3.5 py-2.5 neu-sm mt-3 border border-border/40">
                <span className="flex items-center gap-2.5 text-sm">
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="flex flex-col">
                    <span className="font-semibold text-sm">Мои цены</span>
                    <span className="text-[11px] text-muted-foreground">
                      {useMyPrices ? "Личный прайс-лист" : "Средние по региону"}
                    </span>
                  </span>
                </span>
                <Switch checked={useMyPrices} onCheckedChange={setUseMyPrices} />
              </label>
            </div>
          </div>

          {/* 2. Блок: Диалог с ИИ */}
          <div className="glass neu flex flex-col rounded-3xl p-5 md:p-6 border border-border/30">
            <div className="flex items-center gap-2.5 border-b border-border/40 pb-3.5 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Диалог с ИИ</h2>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto py-2 pr-1 scrollbar-thin">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    "max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed " +
                    (m.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground font-medium"
                      : "neu-sm bg-card/60 border border-border/20")
                  }
                >
                  {m.text}
                </div>
              ))}
              {isLoading && (
                <div className="max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed neu-sm bg-card/60 border border-border/20 flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Анализирую данные и считаю смету...
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5 pt-4 border-t border-border/40 mt-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Опишите задачу..."
                disabled={isLoading}
                className="neu-inset h-11 rounded-xl flex-1 border-border/40"
              />
              <button
                onClick={send}
                disabled={isLoading || !input.trim()}
                className="grid shrink-0 h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground glow transition hover:bg-primary/90 active:scale-95 shadow-md disabled:opacity-50 disabled:pointer-events-none"
              >
                {isLoading ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : <Send className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          {/* 3. Блок: Документ Смета */}
          <div className="w-full glass neu rounded-3xl p-4 md:p-6 border border-border/30 overflow-x-auto">
            <div className="mb-5 flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <FileText className="h-4 w-4 text-primary" />
                Документ · Смета
              </div>
              <span className="text-xs font-medium text-muted-foreground bg-black/10 px-2 py-0.5 rounded-md">A4 · предпросмотр</span>
            </div>
            
            <div className="min-w-[700px] sm:min-w-full rounded-2xl bg-black/5 dark:bg-black/30 p-2 md:p-3 border border-border/20">
              <EstimatePaper region={region} objectType={objectType} customItems={estimateData} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
