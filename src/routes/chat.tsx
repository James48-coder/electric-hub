import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
});

export function ChatPage() {
  return (
    <div className="mx-auto w-full max-w-4xl py-6 h-[85vh] flex flex-col text-slate-100">
      <header className="mb-6 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Чат с ИИ</h1>
        <p className="text-muted-foreground">Твой личный эксперт по электромонтажу</p>
      </header>

      {/* Блок перехода в DeepSeek */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 grid place-items-center">
          <Bot className="w-8 h-8" />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-2xl font-bold">ИИ-ассистент DeepSeek</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Для детальных консультаций по нормам ПУЭ, расчетам и схемам вы можете использовать официальный помощник DeepSeek, который стабильно доступен в России.
          </p>
        </div>
        <a 
          href="https://chat.deepseek.com" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 gap-2 h-12 px-6 rounded-2xl font-semibold">
            Открыть чат DeepSeek <ExternalLink className="w-4 h-4" />
          </Button>
        </a>
      </div>
    </div>
  );
}
