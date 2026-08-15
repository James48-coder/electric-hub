import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, TrendingDown, Info, AlertTriangle, CheckCircle2 } from 'lucide-react'
import React, { useState } from 'react'

export const Route = createFileRoute('/calculators/voltage')({
  component: VoltageDropPage,
})

function VoltageDropPage() {
  const [power, setPower] = useState('')
  const [length, setLength] = useState('')
  const [section, setSection] = useState('2.5')
  const [voltage, setVoltage] = useState('220')
  const [material, setMaterial] = useState('copper')

  const calculate = () => {
    if (!power || !length || !section) return null
    const p = parseFloat(power.replace(',', '.'))
    const l = parseFloat(length.replace(',', '.'))
    const s = parseFloat(section.replace(',', '.'))
    
    if (isNaN(p) || isNaN(l) || isNaN(s) || s === 0) return null

    const rho = material === 'copper' ? 0.0175 : 0.028

    let current = 0
    let voltageDrop = 0
    let voltageDropPercent = 0

    if (voltage === '220') {
      current = (p * 1000) / 220
      voltageDrop = (2 * l * current * rho) / s
      voltageDropPercent = (voltageDrop / 220) * 100
    } else {
      current = (p * 1000) / (380 * 1.732)
      voltageDrop = (1.732 * l * current * rho) / s
      voltageDropPercent = (voltageDrop / 380) * 100
    }

    const isOk = voltageDropPercent <= 5

    return {
      dropVolts: voltageDrop.toFixed(2),
      dropPercent: voltageDropPercent.toFixed(2),
      isOk
    }
  }

  const result = calculate()

  // Тот же единый стиль кнопок
  const activeClass = "bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400 shadow-sm"
  const inactiveClass = "bg-background border-border text-muted-foreground hover:border-amber-500/50 hover:text-foreground"

  return (
    <div className="container mx-auto p-6 max-w-4xl animate-in fade-in duration-500 text-foreground pb-24">
      <Link to="/calculators" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group">
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        Назад к инженерному набору
      </Link>

      <div className="bg-card border border-border rounded-[var(--radius)] shadow-sm overflow-hidden">
        <div className="border-b border-border p-6 bg-yellow-500/5 flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500 shrink-0">
            <TrendingDown className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Падение напряжения</h1>
            <p className="text-sm text-muted-foreground mt-1">Расчет потерь в кабеле в зависимости от длины, сечения и нагрузки</p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground">Мощность (кВт)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={power}
                    onChange={(e) => setPower(e.target.value)}
                    placeholder="Напр: 3.5"
                    className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground">Длина трассы (м)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="Напр: 45"
                    className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Сечение жилы (мм²)</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-medium transition-all"
              >
                <option value="1.5">1.5 мм²</option>
                <option value="2.5">2.5 мм²</option>
                <option value="4">4.0 мм²</option>
                <option value="6">6.0 мм²</option>
                <option value="10">10.0 мм²</option>
                <option value="16">16.0 мм²</option>
                <option value="25">25.0 мм²</option>
                <option value="35">35.0 мм²</option>
                <option value="50">50.0 мм²</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground">Напряжение и Материал</label>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  onClick={() => setVoltage('220')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${voltage === '220' ? activeClass : inactiveClass}`}
                >
                  220 В
                </button>
                <button
                  onClick={() => setVoltage('380')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${voltage === '380' ? activeClass : inactiveClass}`}
                >
                  380 В
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMaterial('copper')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${material === 'copper' ? activeClass : inactiveClass}`}
                >
                  Медь (Cu)
                </button>
                <button
                  onClick={() => setMaterial('aluminum')}
                  className={`h-12 rounded-lg border text-sm font-bold transition-all duration-300 ${material === 'aluminum' ? activeClass : inactiveClass}`}
                >
                  Алюминий (Al)
                </button>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-2xl p-6 border border-border flex flex-col justify-center">
            {!result ? (
              <div className="text-center text-muted-foreground space-y-3">
                <Info className="h-10 w-10 mx-auto opacity-20" />
                <p className="text-sm">Заполните поля мощности, длины и сечения для расчета.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in zoom-in-95 duration-300">
                <div className={`rounded-xl p-5 border shadow-sm relative overflow-hidden ${
                  result.isOk ? 'bg-green-500/10 border-green-500/20' : 'bg-destructive/10 border-destructive/20'
                }`}>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${result.isOk ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
                        Потеря напряжения
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-5xl font-black ${result.isOk ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
                          {result.dropPercent}
                        </span>
                        <span className={`text-xl font-bold ${result.isOk ? 'text-green-600/70 dark:text-green-400/70' : 'text-destructive/70'}`}>
                          %
                        </span>
                      </div>
                    </div>
                    {result.isOk ? (
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-8 w-8 text-destructive" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-2 relative z-10">
                    <span className="text-sm font-medium text-foreground">Абсолютное падение:</span>
                    <span className="font-bold text-foreground">{result.dropVolts} Вольт</span>
                  </div>
                </div>

                <div className="bg-background rounded-xl p-4 border border-border shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${result.isOk ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'}`}>
                      <Info className="h-5 w-5" />
                    </div>
                    <p className="text-sm text-foreground font-medium">
                      {result.isOk 
                        ? 'Потери в пределах нормы (до 5% по ПУЭ).' 
                        : 'Внимание! Потери превышают 5%. Рекомендуется увеличить сечение кабеля.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
