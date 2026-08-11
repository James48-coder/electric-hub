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
    { 
      id: 1, 
      sender: "ai", 
      text: "Привет! Я эксперт-ассистент ВольтПро. Спрашивай любые вопросы по электромонтажу: подбор сечения кабеля, выбор автоматов, УЗО, требования ПУЭ и ГОСТ или сборка щита." 
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Интеллектуальный помощник по электромонтажу
  const getSmartElectricianResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("сечени") || q.includes("кабель") || q.includes("провод") || q.includes("мм")) {
      return "По нормам ПУЭ и ГОСТ Р 50571.5.52 для скрытой и открытой проводки в жилых помещениях используется только медный кабель (ВВГнг-LS):\n• Освещение (до 10А / 2.2 кВт): сечение 1.5 мм², автомат 10 А.\n• Розеточные группы (до 16А / 3.5 кВт): сечение 2.5 мм², автомат 16 А.\n• Мощные потребители (варочная панель, электроплита): сечение 4 - 6 мм², автомат 25 - 32 А.";
    }
    if (q.includes("узо") || q.includes("диф") || q.includes("утечк")) {
      return "Согласно ПУЭ гл. 7.1 по токам утечки УЗО:\n• 10 мА — мокрые зоны (ванная комната, душевые, бассейны).\n• 30 мА — групповые линии розеток в жилых комнатах и кухне (защита человека).\n• 100 или 300 мА — противопожарное УЗО на ввод в щит.\nПравило выбора по току: номинал УЗО должен быть на ступень выше номинала защитного автомата (например, автомат 16 А — УЗО 25 А).";
    }
    if (q.includes("автомат") || q.includes("ампер") || q.includes("а")) {
      return "Выбор автоматического выключателя зависит от допустимого длительного тока кабеля:\n• Для кабеля 1.5 мм² ставится автомат максимум на 10 А.\n• Для кабеля 2.5 мм² — автомат на 16 А.\n• Для кабеля 4.0 мм² — автомат на 25 А.\nАвтомат защищает именно кабель от перегрева и короткого замыкания!";
    }
    if (q.includes("заземлен") || q.includes("tn") || q.includes("tt") || q.includes("ноль") || q.includes("pen")) {
      return "В современных жилых зданиях в РФ применяется система заземления TN-C-S (разделение PEN-проводника на рабочий ноль N и защитное заземление PE на вводе в здание). В частных домах при плохом качестве линий иногда делают систему TT с независимым контуром и обязательным УЗО.";
    }
    if (q.includes("пуэ") || q.includes("гост") || q.includes("снип") || q.includes("норм")) {
      return "В нашей Базе знаний собраны ключевые документы: ПУЭ 7-е издание, ГОСТ 31565-2012 (кабели нг-LS), СП 256.1325800.2016 (проектирование электроустановок), ГОСТ 32144-2013 (качество электроэнергии 230В ±10%).";
    }
    if (q.includes("схем") || q.includes("выключател") || q.includes("розетк")) {
      return "В разделе «Описание схем» подробно расписаны типовые задачи: обычный и двухклавишный выключатели (строгий разрыв фазы), проходные выключатели, подключение розеток и сборка щита.";
    }

    return `Отличный вопрос! Исходя из правил электромонтажа и стандартов ПУЭ и ГОСТ, здесь важно учесть нагрузку и требования безопасности. Уточни параметры линии (мощность в кВт или ток в амперах), и я подскажу точный расчет и номиналы!`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input;
    const newUserMessage: Message = { id: Date.now(), sender: "user", text: userText };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    // Имитируем живой ответ эксперта
    setTimeout(() => {
      const aiReplyText = getSmartElectricianResponse(userText);
      const aiResponse: Message = { 
        id: Date.now() + 1, 
        sender: "ai", 
        text: aiReplyText 
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 600);
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
            <div className={`p-4 rounded-2xl max-w-[85%] text-sm whitespace-pre-line leading-relaxed ${m.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-200"}`}>
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
          placeholder="Спроси про сечение кабеля, УЗО или нормы ПУЭ..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl h-12 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 h-12 w-12 rounded-2xl shrink-0">
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
