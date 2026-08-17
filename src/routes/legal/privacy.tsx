import { createFileRoute, Link } from '@tanstack/react-router'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/legal/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl animate-in fade-in duration-500 pb-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 sm:mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> На главную
      </Link>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 border-b border-border pb-6">
          <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
            <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-foreground">Политика конфиденциальности</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">В соответствии с ФЗ-152 «О персональных данных»</p>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8 text-sm sm:text-base text-foreground leading-relaxed">
          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">1. Сбор и обработка данных</h2>
            <p className="mb-2">1.1. Платформа «ВольтПро» (далее — Оператор) собирает минимально необходимый объем данных для оказания услуг: email-адрес (для создания аккаунта), имя/псевдоним (для чата) и платежные реквизиты (обрабатываются на стороне защищенного платежного шлюза, Оператор не хранит данные карт).</p>
            <p>1.2. Технические данные (cookie, IP-адрес) используются исключительно для обеспечения безопасности авторизации и аналитики посещаемости.</p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">2. Локализация и безопасность</h2>
            <p className="mb-2">2.1. В соответствии с законодательством РФ, сбор, запись, систематизация и хранение персональных данных граждан РФ осуществляется на серверах, физически расположенных на территории Российской Федерации.</p>
            <p>2.2. Оператор применяет современные технические средства защиты (шифрование передачи данных через HTTPS, хеширование паролей) для предотвращения утечек.</p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">3. Права субъекта персональных данных</h2>
            <p className="mb-2">3.1. Пользователь имеет право в любой момент:</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Отозвать согласие на обработку данных;</li>
              <li>Запросить выгрузку своих данных, хранящихся на серверах Оператора;</li>
              <li>Удалить свой аккаунт и всю связанную информацию из системы в Личном кабинете.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
