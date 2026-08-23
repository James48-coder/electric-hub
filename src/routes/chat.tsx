import { createFileRoute } from '@tanstack/react-router'
import { Bot, User, Send, Paperclip, AlertTriangle, MessageSquare, Plus, Menu, X, MoreVertical, Loader2 } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'

export const Route = createFileRoute('/chat')({
  component: ChatPage,
})

type Message = {
  id: string
  role: 'user' | 'ai'
  text: string
}

function ChatPage() {
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  
  // Реф для контейнера с сообщениями
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const chatHistory = [
    { id: 1, title: 'Заземление TN-C-S', date: 'Сегодня' },
    { id: 2, title: 'Кабель для 15кВт', date: 'Вчера' },
    { id: 3, title: 'Смета на гараж', date: '18 авг' },
    { id: 4, title: 'ПУЭ 7.1.37 (Ванная)', date: '12 авг' },
  ]

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      text: 'Приветствую! Я ИИ-ассистент ВольтПро, обученный на нормах ПУЭ, СНиП и ГОСТ. Какой вопрос по электромонтажу или проектированию вас интересует?'
    }
  ])

  // Правильная прокрутка с микро-задержкой для точного позиционирования
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }
    }
    // Ждем 50мс, пока DOM обновится, затем крутим
    const timeoutId = setTimeout(scrollToBottom, 50)
    return () => clearTimeout(timeoutId)
  }, [messages, isTyping])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: 'Согласно ПУЭ (п. 7.1.38), электрические сети, прокладываемые за непроходными подвесными потолками и в перегородках, рассматриваются как скрытые электропроводки. Их следует выполнять в металлических трубах, обладающих локализационной способностью.\n\nОбратите внимание на соответствие ГОСТ Р 50571.5.52-2011 при выборе сечения. Если трасса длинная, обязательно проверяйте падение напряжения (ΔU).'
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  return (
    // Убрали жесткий dvh для мобилок. Теперь это гибкий контейнер с min-h-[600px]
    <div className="container mx-auto max-w-6xl animate-in fade-in duration-500 w-full flex flex-col relative px-2 sm:px-4 pb-4 min-h-[600px] md:h-[calc(100vh-140px)]">
      
      <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm flex overflow-hidden relative">
        
        {/* === ЛЕВАЯ ПАНЕЛЬ (ИСТОРИЯ) === */}
        <div className={`
          absolute inset-y-0 left-0 z-40 w-72 bg-muted/30 border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col
          md:relative md:translate-x-0
          ${isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}>
          <div className="p-4 border-b border-border flex items-center justify-between bg-card shrink-0">
            <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> Новый диалог
            </button>
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="md:hidden ml-2 p-2 text-muted-foreground hover:bg-muted rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-2 mb-2 mt-2">Недавние</p>
            {chatHistory.map((chat) => (
              <button key={chat.id} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-background border border-transparent hover:border-border transition-all text-left group">
                <MessageSquare className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{chat.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Затемнение фона для мобилки */}
        {isMobileSidebarOpen && (
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* === ПРАВАЯ ПАНЕЛЬ (РАБОЧАЯ ЗОНА ЧАТА) === */}
        <div className="flex-1 flex flex-col min-w-0 bg-background/50 h-full">
          
          {/* Шапка чата */}
          <div className="h-16 border-b border-border flex items-center px-3 sm:px-4 bg-card shrink-0">
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden mr-2 sm:mr-3 p-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors border border-border bg-background"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-foreground text-sm sm:text-base truncate">ИИ-ассистент DeepSeek</span>
                <span className="text-[9px] sm:text-[10px] text-primary font-medium flex items-center gap-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0"></span>
                  На базе ПУЭ и ГОСТ
                </span>
              </div>
            </div>
            
            <button className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors shrink-0 ml-2">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* КОМПАКТНЫЙ ДИСКЛЕЙМЕР */}
          <div className="p-2 sm:p-4 bg-background/90 backdrop-blur-sm z-10 shrink-0 border-b border-border/50">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg sm:rounded-xl p-2.5 sm:p-3 flex items-start gap-2.5 shadow-sm">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[10px] sm:text-xs text-amber-600 dark:text-amber-500 leading-tight sm:leading-relaxed font-medium">
                <strong className="font-bold">Внимание:</strong> ИИ может ошибаться. Сверяйте сечения и номиналы по таблицам ПУЭ перед началом работ.
              </p>
            </div>
          </div>

          {/* Область сообщений (min-h-0 нужен для корректного скролла внутри flex) */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 space-y-4 sm:space-y-6 min-h-0">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex w-full max-w-[95%] md:max-w-[85%] gap-2 sm:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  
                  {/* Иконка */}
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                    msg.role === 'user' ? 'bg-muted border border-border text-muted-foreground' : 'bg-primary text-primary-foreground shadow-md'
                  }`}>
                    {msg.role === 'user' ? <User className="w-3 h-3 sm:w-4 sm:h-4" /> : <Bot className="w-3 h-3 sm:w-4 sm:h-4" />}
                  </div>

                  {/* Пузырь (Добавлены жесткие классы от переполнения: min-w-0, break-words) */}
                  <div className={`p-3 sm:p-4 rounded-2xl text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap break-words min-w-0 [overflow-wrap:anywhere] shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-muted border border-border text-foreground rounded-tr-sm' 
                    : 'bg-card border-2 border-primary/10 text-foreground rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Анимация печати */}
            {isTyping && (
              <div className="flex w-full justify-start">
                <div className="flex w-full max-w-[95%] md:max-w-[85%] gap-2 sm:gap-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mt-1 text-primary-foreground shadow-md">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                  <div className="p-3 sm:p-4 rounded-2xl bg-card border-2 border-primary/10 rounded-tl-sm flex items-center gap-2 text-muted-foreground text-[13px] sm:text-sm shadow-sm min-w-0">
                    <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
                    <span className="truncate">Анализ нормативов...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ИДЕАЛЬНАЯ СТРОКА ВВОДА */}
          <div className="p-2 sm:p-4 bg-card border-t border-border shrink-0 z-10">
            <form onSubmit={handleSend} className="relative flex items-end gap-1 sm:gap-2 bg-background border border-border rounded-xl p-1 shadow-sm focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary transition-all">
              
              <button type="button" className="p-2 sm:p-3 text-muted-foreground hover:text-primary transition-colors rounded-lg shrink-0 mb-0.5 sm:mb-1 ml-0.5">
                <Paperclip className="w-5 h-5 sm:w-5 sm:h-5" />
              </button>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend(e)
                  }
                }}
                placeholder="Запрос по ПУЭ..."
                className="flex-1 max-h-32 min-h-[40px] bg-transparent border-none focus:ring-0 resize-none py-2.5 sm:py-3 px-1 text-[13px] sm:text-sm text-foreground placeholder:text-muted-foreground outline-none break-words"
                rows={1}
              />
              
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="p-2 sm:p-2.5 bg-primary text-primary-foreground rounded-lg sm:rounded-xl shadow-md hover:bg-primary/90 transition-all disabled:opacity-50 disabled:shadow-none shrink-0 mb-0.5 sm:mb-1 mr-0.5 sm:mr-1"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
