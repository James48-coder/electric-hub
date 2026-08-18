import { createFileRoute } from '@tanstack/react-router'
import { Shield, Zap, Search, Fingerprint, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/decoder')({
  component: DecoderPage,
})

// --- БАЗЫ ДАННЫХ ДЛЯ ДЕКОДЕРА ---

const ipFirstDigit = [
  { val: 0, desc: 'Нет защиты от твердых частиц.' },
  { val: 1, desc: 'Защита от частиц > 50 мм (например, случайное касание рукой).' },
  { val: 2, desc: 'Защита от частиц > 12.5 мм (защита от пальцев).' },
  { val: 3, desc: 'Защита от частиц > 2.5 мм (инструменты, толстые провода).' },
  { val: 4, desc: 'Защита от частиц > 1 мм (провода, мелкие инструменты).' },
  { val: 5, desc: 'Пылезащищенное. Некоторое количество пыли может проникать, но не мешает работе.' },
  { val: 6, desc: 'Пыленепроницаемое. Полная защита от любых контактов и пыли.' },
]

const ipSecondDigit = [
  { val: 0, desc: 'Нет защиты от влаги.' },
  { val: 1, desc: 'Защита от вертикально падающих капель воды.' },
  { val: 2, desc: 'Защита от капель воды, падающих под углом до 15°.' },
  { val: 3, desc: 'Защита от дождя (капли под углом до 60°).' },
  { val: 4, desc: 'Защита от сплошного обрызгивания со всех сторон.' },
  { val: 5, desc: 'Защита от водяных струй с любого направления.' },
  { val: 6, desc: 'Защита от сильных водяных струй (морские волны).' },
  { val: 7, desc: 'Защита при кратковременном погружении в воду (до 1 м).' },
  { val: 8, desc: 'Защита при длительном погружении в воду под давлением.' },
  { val: 9, desc: 'Защита от горячих водяных струй высокого давления (мойка под давлением).' },
]

const cableDictionary = [
  { abbr: 'А', desc: 'Алюминиевая жила (если первая буква). Если её нет — медь.' },
  { abbr: 'В', desc: 'Изоляция жил из поливинилхлоридного (ПВХ) пластиката.' },
  { abbr: 'В (вторая)', desc: 'Оболочка из ПВХ пластиката.' },
  { abbr: 'Г', desc: '«Голый». Нет защитного покрова (брони).' },
  { abbr: 'нг', desc: 'Не поддерживает горение при групповой прокладке.' },
  { abbr: 'LS', desc: 'Low Smoke. Низкое дымо- и газовыделение при тлении.' },
  { abbr: 'FRLS', desc: 'Fire Resistance Low Smoke. Огнестойкий (работает в огне) с низким дымовыделением.' },
  { abbr: 'Шв', desc: 'Защитный покров в виде выпрессованного шланга из ПВХ.' },
  { abbr: 'Б', desc: 'Броня из двух стальных лент.' },
  { abbr: 'КГ', desc: 'Кабель гибкий (многопроволочная жила).' },
  { abbr: 'NYM', desc: 'Европейский стандарт (N - нормированный, Y - ПВХ изоляция, M - с оболочкой).' },
]

const breakersDict = [
  { type: 'B', range: '3 - 5 In', desc: 'Для сетей без больших пусковых токов (освещение, старые дома, длинные линии).' },
  { type: 'C', range: '5 - 10 In', desc: 'Самый частый тип. Для обычных розеточных сетей и квартир.' },
  { type: 'D', range: '10 - 20 In', desc: 'Для сетей с высокими пусковыми токами (компрессоры, мощные станки, насосы).' },
  { type: 'A', range: '2 - 3 In', desc: 'Для защиты сверхчувствительного оборудования и полупроводников.' },
]

function DecoderPage() {
  const [activeTab, setActiveTab] = useState<'ip' | 'cable' | 'breaker'>('ip')
  
  // Состояния для калькулятора IP
  const [digit1, setDigit1] = useState(2)
  const [digit2, setDigit2] = useState(0)

  // Поиск по кабелям
  const [cableSearch, setCableSearch] = useState('')

  return (
    <div className="container mx-auto max-w-4xl animate-in fade-in duration-500 pb-24">
      
      {/* ЗАГОЛОВОК */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight mb-2">Декодер</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Интерактивный справочник маркировок и норм</p>
      </div>

      {/* ВКЛАДКИ (Разделены на 3 независимые кнопки) */}
      <div className="flex gap-3 sm:gap-4 mb-8 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden w-full">
        <button 
          onClick={() => setActiveTab('ip')}
          className={`flex items-center justify-center gap-2 flex-1 min-w-[180px] px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm font-bold transition-all border ${
            activeTab === 'ip' 
              ? 'bg-primary border-primary text-primary-foreground shadow-md scale-[1.02]' 
              : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground hover:shadow-sm'
          }`}
        >
          <Shield className="w-4 h-4" /> Защита IP
        </button>
        <button 
          onClick={() => setActiveTab('cable')}
          className={`flex items-center justify-center gap-2 flex-1 min-w-[180px] px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm font-bold transition-all border ${
            activeTab === 'cable' 
              ? 'bg-primary border-primary text-primary-foreground shadow-md scale-[1.02]' 
              : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground hover:shadow-sm'
          }`}
        >
          <Fingerprint className="w-4 h-4" /> Маркировка кабелей
        </button>
        <button 
          onClick={() => setActiveTab('breaker')}
          className={`flex items-center justify-center gap-2 flex-1 min-w-[180px] px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm font-bold transition-all border ${
            activeTab === 'breaker' 
              ? 'bg-primary border-primary text-primary-foreground shadow-md scale-[1.02]' 
              : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground hover:shadow-sm'
          }`}
        >
          <Zap className="w-4 h-4" /> Характеристики УЗО
        </button>
      </div>

      {/* --- РАЗДЕЛ IP ЗАЩИТА --- */}
      {activeTab === 'ip' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full pointer-events-none"></div>
            
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-2">Класс защиты</p>
            <h2 className="text-6xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70 tracking-tighter mb-8 drop-shadow-sm">
              IP {digit1}{digit2}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Селектор первой цифры */}
              <div className="bg-background rounded-xl border border-border p-4 text-left">
                <label className="block text-xs font-bold text-primary mb-3 uppercase tracking-wider">1-я цифра: Твердые тела</label>
                <select 
                  className="w-full bg-muted/50 border border-border rounded-lg p-3 text-sm font-bold text-foreground focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                  value={digit1}
                  onChange={(e) => setDigit1(Number(e.target.value))}
                >
                  {ipFirstDigit.map(item => (
                    <option key={item.val} value={item.val}>{item.val} - {item.desc.substring(0, 30)}...</option>
                  ))}
                </select>
                <p className="mt-3 text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{ipFirstDigit.find(i => i.val === digit1)?.desc}</span>
                </p>
              </div>

              {/* Селектор второй цифры */}
              <div className="bg-background rounded-xl border border-border p-4 text-left">
                <label className="block text-xs font-bold text-blue-500 mb-3 uppercase tracking-wider">2-я цифра: Влага</label>
                <select 
                  className="w-full bg-muted/50 border border-border rounded-lg p-3 text-sm font-bold text-foreground focus:outline-none focus:border-blue-500/50 transition-colors cursor-pointer"
                  value={digit2}
                  onChange={(e) => setDigit2(Number(e.target.value))}
                >
                  {ipSecondDigit.map(item => (
                    <option key={item.val} value={item.val}>{item.val} - {item.desc.substring(0, 30)}...</option>
                  ))}
                </select>
                <p className="mt-3 text-sm text-muted-foreground flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{ipSecondDigit.find(i => i.val === digit2)?.desc}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- РАЗДЕЛ КАБЕЛИ --- */}
      {activeTab === 'cable' && (
        <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Введите маркировку (например, ВВГнг или LS)..."
              className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-4 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
              value={cableSearch}
              onChange={(e) => setCableSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {cableDictionary
              .filter(item => item.abbr.toLowerCase().includes(cableSearch.toLowerCase()) || item.desc.toLowerCase().includes(cableSearch.toLowerCase()))
              .map((item, idx) => (
                <div key={idx} className="bg-card border border-border p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col hover:border-primary/50 transition-colors">
                  <span className="text-lg font-black text-primary mb-2">{item.abbr}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed">{item.desc}</span>
                </div>
            ))}
          </div>
        </div>
      )}

      {/* --- РАЗДЕЛ АВТОМАТЫ --- */}
      {activeTab === 'breaker' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-bottom-2 duration-300">
          {breakersDict.map((item, idx) => (
            <div key={idx} className="bg-card border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-xl font-black text-primary">
                  {item.type}
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">Ток отключения</span>
                  <span className="text-sm font-bold text-foreground">{item.range}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
