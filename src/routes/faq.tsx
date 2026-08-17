import { createFileRoute, Link } from '@tanstack/react-router'
import { HelpCircle, ChevronDown, ArrowLeft, MessageSquare } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/faq')({
  component: FaqPage,
})

// База данных наших частых вопросов
const faqData = [
  {
    id: 1,
    question: "Откуда ИИ-сметчик берет актуальные цены на материалы?",
    answer: "Наш алгоритм регулярно анализирует средние розничные и оптовые цены в крупных электротехнических и строительных сетях (ЭТМ, Русский Свет, Петрович и др.). При формировании сметы цены усредняются по рынку. В готовой смете вы всегда можете вручную скорректировать любую стоимость под своего конкретного поставщика."
  },
  {
    id: 2,
    question: "Как отменить платную подписку?",
    answer: "В строгом соответствии с законодательством РФ, вы можете отменить автопродление подписки в любой момент в 1 клик. Перейдите в Личный кабинет (раздел «Профиль»), найдите блок «Способ оплаты» и нажмите кнопку «Отвязать карту». Ваш доступ к платным функциям сохранится до конца уже оплаченного месяца."
  },
  {
    id: 3,
    question: "Удобно ли пользоваться сервисом с телефона прямо на объекте?",
    answer: "Абсолютно! ВольтПро изначально разрабатывался с применением подхода Mobile-First. Все наши инженерные калькуляторы, интерактивные схемы и даже ИИ-сметчик идеально адаптированы под экраны смартфонов. Вы можете делать точные расчеты, стоя на стремянке."
  },
  {
    id: 4,
    question: "В чем главное отличие тарифа «Мастер» от «PRO»?",
    answer: "На тарифе «Мастер» вам доступен весь базовый функционал, но есть лимит — не более 20 смет в месяц через ИИ-сметчика. Тариф «PRO» снимает это ограничение, дает безлимитный доступ к сметчику, позволяет сохранять историю ваших объектов и генерировать красивые PDF-отчеты для заказчиков."
  },
  {
    id: 5,
    question: "Я нашел ошибку в расчетах калькулятора. Куда писать?",
    answer: "Мы постоянно совершенствуем формулы по ГОСТ и ПУЭ, но если вы заметили неточность — напишите нам в официальный Telegram-чат (кнопка в самом низу сайта) или на почту support@voltpro.ru. Мы проверим алгоритм и оперативно выпустим обновление."
  }
]

function FaqPage() {
  // Состояние для хранения ID открытого вопроса
  const [openId, setOpenId] = useState<number | null>(1) // По умолчанию открыт первый вопрос

  const toggleQuestion = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-3xl animate-in fade-in duration-500 pb-24">
      
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 sm:mb-8 group focus:outline-none">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> На главную
      </Link>

      <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
        <div className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-primary/10 text-primary shrink-0 shadow-inner">
          <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">Частые вопросы</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Всё, что нужно знать о работе ВольтПро</p>
        </div>
      </div>

      {/* Блок с аккордеоном вопросов */}
      <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-12">
        {faqData.map((item) => {
          const isOpen = openId === item.id

          return (
            <div 
              key={item.id} 
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-card border-primary/30 shadow-md' : 'bg-background border-border hover:border-primary/30 hover:bg-card/50'}`}
            >
              <button
                onClick={() => toggleQuestion(item.id)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left focus:outline-none"
              >
                <span className={`font-bold text-sm sm:text-base pr-4 transition-colors ${isOpen ? 'text-primary' : 'text-foreground'}`}>
                  {item.question}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="p-4 sm:p-6 pt-0 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Блок связи с поддержкой, если ответа не нашлось */}
      <div className="bg-gradient-to-br from-card to-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Не нашли ответ на свой вопрос?</h3>
          <p className="text-sm text-muted-foreground">Напишите в наш чат поддержки, и мы ответим в течение 10 минут.</p>
        </div>
        <a 
          href="https://t.me/voltpro_chat" 
          target="_blank" 
          rel="noopener noreferrer"
          className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          <MessageSquare className="w-5 h-5" /> Задать вопрос
        </a>
      </div>

    </div>
  )
}
