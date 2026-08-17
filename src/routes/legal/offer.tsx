import { createFileRoute, Link } from '@tanstack/react-router'
import { FileText, ArrowLeft } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/legal/offer')({
  component: OfferPage,
})

function OfferPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl animate-in fade-in duration-500 pb-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 sm:mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> На главную
      </Link>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 border-b border-border pb-6">
          <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
            <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-foreground">Публичная оферта</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Редакция от 17 августа 2026 года</p>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 text-sm sm:text-base text-foreground leading-relaxed">
          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">1. Общие положения</h2>
            <p className="mb-2">1.1. Настоящий документ является публичной офертой (в соответствии со ст. 435 и ч. 2 ст. 437 Гражданского кодекса РФ) сервиса «ВольтПро» (далее — Исполнитель) и содержит все существенные условия предоставления доступа к функционалу веб-сервиса.</p>
            <p>1.2. Акцептом (полным и безоговорочным принятием) условий настоящей оферты считается осуществление Пользователем регистрации на Сайте или оплата выбранного Тарифа.</p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">2. Предмет договора</h2>
            <p className="mb-2">2.1. Исполнитель обязуется предоставить Пользователю неисключительное право использования платформы «ВольтПро» (калькуляторы, схемы, ИИ-сметчик) на условиях выбранного Пользователем Тарифа.</p>
            <p>2.2. Сервис предоставляется на условиях «как есть» (as is). Исполнитель не гарантирует, что Сервис будет соответствовать индивидуальным ожиданиям Пользователя.</p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">3. Права и обязанности сторон</h2>
            <p className="mb-2">3.1. Пользователь обязуется использовать результаты работы ИИ-сметчика и калькуляторов исключительно в качестве справочной информации. Исполнитель не несет ответственности за ошибки в расчетах, допущенные из-за неверно введенных Пользователем вводных данных.</p>
            <p>3.2. Исполнитель имеет право вносить изменения в интерфейс, алгоритмы калькуляторов и структуру Базы знаний без предварительного уведомления.</p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">4. Финансовые условия и возврат средств</h2>
            <p className="mb-2">4.1. Стоимость доступа определяется согласно выбранному Тарифу (Уровень 1-3). Оплата производится на условиях 100% предоплаты.</p>
            <p>4.2. В соответствии со ст. 32 Закона РФ «О защите прав потребителей», Пользователь вправе в любой момент отказаться от услуг и запросить возврат средств за неиспользованный период (пропорционально дням). Для этого необходимо подать заявку через личный кабинет.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
