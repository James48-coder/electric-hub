import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
});

type Message = {
  id: number;
  text: string;
  sender: "ai" | "user";
};

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "ai", text: "Привет! Я помощник ВольтПро. С чем помочь на объекте? Подсказать норму ПУЭ или проверить расчет?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMessage: Message = { id: Date.now(), sender: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    setTimeout(() => {
      const aiResponse: Message = { 
        id: Date.now() + 1, 
        sender: "ai", 
        text: "Этот запрос обрабатывается с учетом норм ПУЭ и нашей базы знаний. Скоро здесь будет полноценный ИИ-ассистент." 
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="mx-auto w-full max-w-4xl py-6 h-[85vh] flex flex-col text-slate-100">
      <header className="mb-6 space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Чат с ИИ</h1>
        <p className="text-muted-foreground">Твой личный эксперт по электромонтажу</p>
      </header>

      {/* Окно чата */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-y-auto mb-4 shadow-xl space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex items-start gap-3 ${m.sender === "user" ? "justify-end" : ""}`}>
            {m.sender === "ai" && (
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
            )}
            <div className={`p-4 rounded-2xl max-w-[80%] text-sm ${m.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"}`}>
              {m.text}
            </div>
            {m.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Поле ввода */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Спросить про нормы или схему..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl h-12 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 h-12 w-12 rounded-2xl shrink-0">
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
