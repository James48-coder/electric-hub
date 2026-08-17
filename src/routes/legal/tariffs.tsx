import { createFileRoute, Link } from '@tanstack/react-router'
import { CreditCard, ArrowLeft, AlertTriangle } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/legal/tariffs')({
  component: TariffsPage,
})

function TariffsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl animate-in fade-in duration-500 pb-24">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 sm:mb-8 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> На главную
      </Link>

      <div className="bg-card border border-border rounded-2xl p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 border-b border-border pb-6">
          <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
            <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-foreground">Условия тарифов и подписок</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Правила оплаты и отмены</p>
          </div>
        </div>

        {/* Информационный блок-предупреждение */}
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3 mb-8">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            В соответствии с изменениями в Законе «О защите прав потребителей» (от 1 марта 2026 г.), вы имеете право отменить автоматическое продление подписки и отвязать банковскую карту <strong>в один клик</strong> в настройках вашего Профиля.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8 text-sm sm:text-base text-foreground leading-relaxed">
          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">1. Уровни доступа</h2>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <h3 className="font-bold text-primary mb-1">Уровень 0: Гость</h3>
                <p className="text-sm">Бесплатный базовый доступ. Ограниченное число расчетов в калькуляторах, чтение статей. Доступ к ИИ-сметчику закрыт.</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <h3 className="font-bold text-primary mb-1">Уровень 1: Мастер</h3>
                <p className="text-sm">Полный доступ к калькуляторах и Базе знаний. Лимит: 20 смет/месяц через ИИ-сметчик. Доступ в Чат мастеров.</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <h3 className="font-bold text-primary mb-1">Уровень 2: PRO</h3>
                <p className="text-sm">Для активных монтажников. Безлимитный ИИ-сметчик, экспорт смет в PDF/Excel, сохранение объектов в историю.</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg border border-border">
                <h3 className="font-bold text-primary mb-1">Уровень 3: Командный</h3>
                <p className="text-sm">Все функции PRO для команды до 5 человек. Единое пространство для смет, брендирование документов логотипом компании.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">2. Правила рекуррентных платежей</h2>
            <p className="mb-2">2.1. При оформлении платного тарифа (Мастер, PRO, Командный) Пользователь соглашается на автоматические регулярные списания средств с привязанной банковской карты.</p>
            <p>2.2. За 24 часа до планируемого списания система отправляет уведомление на email, указанный при регистрации.</p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">3. Отмена подписки</h2>
            <p className="mb-2">3.1. Пользователь может в любой момент отключить автопродление в разделе «Профиль → Подписка». В этом случае доступ сохраняется до конца оплаченного периода.</p>
            <p>3.2. Если Пользователь удаляет платежные реквизиты (отвязывает карту), любые последующие автоматические списания прекращаются немедленно.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
