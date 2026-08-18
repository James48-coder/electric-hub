import { createFileRoute } from '@tanstack/react-router'
import { Send, Shield, AlertCircle } from 'lucide-react'
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
}

// Стартовые сообщения
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
    text: 'Я обычно беру толстостенную стальную трубу, а на концы обязательно пластиковые втулки ставлю, чтобы изоляцию не счесать при протяжке.',
  }
]

function MastersChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [inputValue, setInputValue] = useState('')
  const [linkError, setLinkError] = useState(false)
  
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Функция проверки на наличие ссылок в тексте
  const containsLink = (text: string) => {
    // Проверяем наличие http://, https://, www., а также доменов .ru, .com, .рф и т.д.
    const linkRegex = /(http[s]?:\/\/|www\.|[a-zA-Z0-9-]+\.(ru|com|net|org|рф|kz|by))/i;
    return linkRegex.test(text);
  }

  // Обработчик ввода текста (сразу убираем ошибку, если пользователь стирает ссылку)
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputValue(text);
    
    if (containsLink(text)) {
      setLinkError(true);
    } else {
      setLinkError(false);
    }
  }

  // Скролл вниз
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

  // Отправка сообщения
  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    
    if (!inputValue.trim() || linkError) return

    // Двойная защита перед отправкой
    if (containsLink(inputValue)) {
      setLinkError(true);
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      author: 'Вы',
      isMe: true,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      text: inputValue.trim(),
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue('')
    setLinkError(false)
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
            <strong className="text-foreground">Публикация сторонних ссылок строго запрещена.</strong> Это необходимо для защиты сообщества от спама и рекламы.
          </p>
        </div>

        {/* ОБЛАСТЬ СООБЩЕНИЙ */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-muted/5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              
              {!msg.isMe && (
                <div className="flex items-center gap-2 mb-1.5 ml-1">
                  <span className="text-xs font-bold text-foreground">{msg.author}</span>
                  <span className="text-[10px] text-muted-foreground">• {msg.time}</span>
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-sm ${
                msg.isMe 
                  ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                  : 'bg-background border border-border text-foreground rounded-tl-sm'
              }`}>
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                  {msg.text}
                </p>
                
                {msg.isMe && (
                  <div className="text-right mt-1 opacity-70 text-[10px]">
                    {msg.time}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ОБЛАСТЬ ВВОДА */}
        <div className="bg-background border-t border-border p-4 shrink-0">
          
          {/* Предупреждение об ошибке */}
          {linkError && (
            <div className="mb-2 flex items-center gap-2 text-xs font-bold text-red-500 animate-in slide-in-from-bottom-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              Ссылки запрещены. Удалите ссылку из текста, чтобы отправить сообщение.
            </div>
          )}

          <form onSubmit={handleSendMessage} className="relative flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Написать сообщение..."
              className={`w-full bg-card border rounded-xl pl-4 pr-12 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all resize-none min-h-[52px] max-h-[120px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-border
                ${linkError ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50' : 'border-border focus:border-primary focus:ring-1 focus:ring-primary/50'}
              `}
              rows={1}
            />
            <button 
              type="submit"
              disabled={!inputValue.trim() || linkError}
              className={`absolute right-2 bottom-2 p-2 rounded-lg transition-colors 
                ${!inputValue.trim() || linkError 
                  ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed' 
                  : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
                }
              `}
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
