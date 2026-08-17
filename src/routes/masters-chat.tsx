import { createFileRoute } from '@tanstack/react-router'
import { Users, Send, ShieldAlert, AlertTriangle } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

export const Route = createFileRoute('/masters-chat')({
  component: MastersChatPage,
})

function MastersChatPage() {
  const [message, setMessage] = useState('')
  // Стейт сообщений
  const [messages, setMessages] = useState([
    { id: 1, author: 'Иван (Монтажник)', time: '14:02', text: 'Мужики, кто какие клеммники использует для освещения в деревянном доме? Wago 221 или лучше скрутка со сваркой?', isMine: false, isSystem: false },
    { id: 2, author: 'Вы', time: '14:05', text: 'Для деревяшки по ПУЭ вообще лучше металлические трубы, но если чисто про соединения — сварка всегда надежнее.', isMine: true, isSystem: false },
    { id: 3, author: 'Алексей_99', time: '14:10', text: 'Посмотри вот эти трубы, мы такие брали:', isMine: false, isSystem: true }, // Ссылка заблокирована
  ])

  const scrollRef = useRef<HTMLDivElement>(null)

  // Прокрутка вниз при новом сообщении
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!message.trim()) return

    const now = new Date()
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`

    // Простая проверка на наличие "http" или "www" (зачаток модерации)
    const hasLink = /(http|www|\.ru|\.com)/i.test(message)

    setMessages([...messages, {
      id: Date.now(),
      author: 'Вы',
      time: timeString,
      text: message,
      isMine: true,
      isSystem: hasLink 
    }])
    setMessage('')
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl animate-in fade-in duration-500 text-foreground h-[calc(100vh-4rem)] flex flex-col">
      
      <div className="mb-4 sm:mb-6 flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
          Чат мастеров
          <span className="bg-green-500/10 text-green-500 text-[10px] sm:text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1.5 border border-green-500/20">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div> 142 онлайн
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Общение, советы по монтажу и обмен опытом.</p>
      </div>

      <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden shadow-sm min-h-0">
        
        {/* Инфо-плашка безопасности */}
        <div className="bg-primary/10 border-b border-primary/20 p-2 sm:p-3 flex items-start sm:items-center gap-2 sm:gap-3 flex-shrink-0">
          <ShieldAlert className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-[10px] sm:text-xs text-primary font-medium leading-tight">
            Любые ссылки скрываются автоматически и публикуются только после ручной модерации для защиты от спама.
          </p>
        </div>

        {/* Область сообщений */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 scroll-smooth">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.isMine ? 'items-end self-end ml-auto' : 'items-start'}`}>
              <span className={`text-[10px] sm:text-xs text-muted-foreground mb-1 font-medium ${msg.isMine ? 'mr-1' : 'ml-1'}`}>
                {msg.author} • {msg.time}
              </span>
              
              <div className={`p-3 sm:p-4 rounded-2xl text-sm shadow-sm border 
                ${msg.isMine ? 'bg-primary text-primary-foreground rounded-tr-sm border-transparent' : 'bg-muted text-foreground rounded-tl-sm border-border'}`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                
                {/* Блок заблокированной ссылки */}
                {msg.isSystem && (
                  <span className={`inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded text-[10px] sm:text-xs italic border ${msg.isMine ? 'bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground/80' : 'bg-background border-border text-muted-foreground'}`}>
                    <AlertTriangle className={`h-3 w-3 ${msg.isMine ? 'text-primary-foreground/80' : 'text-amber-500'}`} /> Ссылка отправлена на модерацию
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Поле ввода (Обернуто в form для срабатывания по Enter) */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-background border-t border-border flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Написать сообщение... (ссылки будут скрыты)"
              className="flex-1 bg-muted border border-border rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
            />
            <button type="submit" disabled={!message.trim()} className="bg-primary text-primary-foreground h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0 shadow-sm disabled:opacity-50">
              <Send className="h-4 w-4 sm:h-5 sm:w-5 ml-1" />
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
