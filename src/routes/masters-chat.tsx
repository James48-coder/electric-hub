import { createFileRoute } from '@tanstack/react-router'
import { Send, Shield, AlertTriangle, Users, Info } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

export const Route = createFileRoute('/masters-chat')({
  component: MastersChatPage,
})

// Типизация сообщения
type Message = {
  id: string;
  author: string;
  isMe: boolean;
  time: string;
  text: string;
  isLinkModerated?: boolean;
}

// Стартовые (моковые) сообщения из твоего дизайна
const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    author: 'Игорь_Электро',
    isMe: false,
    time: '12:30',
    text: 'Мужики, кто как сейчас делает проходки в деревянном срубе? Гофра или только стальная труба по хардкору?',
  },
  {
    id: '2',
    author: 'Вы',
    isMe: true,
    time: '12:35',
    text: 'Для деревяшки по ПУЭ вообще лучше металлические трубы, но если чисто про соединения — сварка всегда надежнее. Скрытую проводку в дереве без локализационной трубы технадзор завернет 100%.',
  },
  {
    id: '3',
    author: 'Алексей_99',
    isMe: false,
    time: '14:10',
    text: 'Посмотри вот эти трубы, мы такие брали на прошлом объекте, очень удобные для гибки:',
    isLinkModerated: true, // Флаг для отображения плашки модерации
  }
]

function MastersChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  // Реф теперь висит на самом контейнере с сообщениями
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Умный скролл ТОЛЬКО внутри контейнера чата
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Функция отправки сообщения
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      author: 'Вы',
      isMe: true,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      text: inputValue.trim(),
      // Простейшая симуляция проверки на ссылки (если есть http или .ru)
      isLinkModerated: /(http|\.ru|\.com)/i.test(inputValue)
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')
  }

  return (
    <div className="container mx-auto max-w-5xl animate-in fade-in duration-500 pb-24">
      
      {/* ШАПКА ЧАТА */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">Чат мастеров</h1>
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shrink-0">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            142 онлайн
          </div>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">Общение, советы по монтажу и обмен опытом.</p>
      </div>

      {/* ГЛАВНЫЙ КОНТЕЙНЕР ЧАТА */}
      <div className="bg-card border border-border rounded-2xl shadow-sm flex flex-col h-[600px] overflow-hidden relative">
        
        {/* ИНФО-ПАНЕЛЬ СВЕРХУ */}
        <div className="bg-background/80 backdrop-blur-sm border-b border-border p-3 flex items-start sm:items-center gap-3 shrink-0 z-10">
          <Shield className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Любые ссылки скрываются автоматически и публикуются только после ручной модерации для защиты от спама.
          </p>
        </div>

        {/* ОБЛАСТЬ СООБЩЕНИЙ (СКРОЛЛИТСЯ ИЗОЛИРОВАННО) */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-muted/5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              
              {/* Имя и время (только для чужих сообщений) */}
              {!msg.isMe && (
                <div className="flex items-center gap-2 mb-1.5 ml-1">
                  <span className="text-xs font-bold text-foreground">{msg.author}</span>
                  <span className="text-[10px] text-muted-foreground">• {msg.time}</span>
                </div>
              )}

              {/* Само сообщение (Баббл) */}
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm ${
                msg.isMe 
                  ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                  : 'bg-background border border-border text-foreground rounded-tl-sm'
              }`}>
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                  {msg.text}
                </p>

                {/* Плашка модерации ссылки */}
                {msg.isLinkModerated && (
                  <div className={`mt-3 flex items-center gap-2 p-2.5 rounded-lg text-xs font-bold ${
                    msg.isMe ? 'bg-black/20 text-white/90' : 'bg-orange-500/10 border border-orange-500/20 text-orange-500'
                  }`}>
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Ссылка отправлена на модерацию
                  </div>
                )}
                
                {/* Время для своих сообщений внутри баббла */}
                {msg.isMe && (
                  <div className="text-right mt-1 opacity-70 text-[10px]">
                    {msg.time}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ОБЛАСТЬ ВВОДА (ЗАКРЕПЛЕНА ВНИЗУ) */}
        <div className="bg-background border-t border-border p-4 shrink-0">
          <form onSubmit={handleSendMessage} className="relative flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Написать сообщение... (ссылки будут скрыты)"
              className="w-full bg-card border border-border rounded-xl pl-4 pr-12 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none min-h-[52px] max-h-[120px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border"
              rows={1}
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 bottom-2 p-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-primary/10 disabled:hover:text-primary"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Нажмите Enter для отправки. Shift + Enter для переноса строки.
          </p>
        </div>

      </div>
    </div>
  )
}
