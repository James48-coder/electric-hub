import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { 
  Send, 
  Printer, 
  Share, 
  Lock, 
  Zap, 
  Settings2,
  FileText,
  Building2
} from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute('/estimator')({
  component: Estimator,
});

type TariffLevel = 'GUEST' | 'MASTER' | 'PRO' | 'TEAM';

interface EstimateItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

function Estimator() {
  const [tariff, setTariff] = useState<TariffLevel>('GUEST');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [estimateData, setEstimateData] = useState<EstimateItem[] | null>(null);
  
  const [region, setRegion] = useState(''); 
  const [objectType, setObjectType] = useState('apartment');
  const [useMyPrices, setUseMyPrices] = useState(false);

  // --- УМНАЯ ГЕНЕРАЦИЯ СМЕТЫ С ПАРСИНГОМ РОЗЕТОК ---
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    
    setTimeout(() => {
      const text = prompt.toLowerCase();
      let generated: EstimateItem[] = [];

      // Базовая логика для гаража
      if (text.includes('гараж')) {
        generated = [
          { id: '1', name: 'Прокладка кабеля ВВГнг-LS 3х1.5 (открыто)', unit: 'м', quantity: 15, pricePerUnit: 120, total: 1800 },
          { id: '2', name: 'Установка накладного выключателя', unit: 'шт', quantity: 1, pricePerUnit: 350, total: 350 },
          { id: '3', name: 'Монтаж накладного светильника', unit: 'шт', quantity: 4, pricePerUnit: 500, total: 2000 },
          { id: '4', name: 'Установка распредкоробки открытой проводки', unit: 'шт', quantity: 2, pricePerUnit: 400, total: 800 },
        ];
      } else {
        generated = [
          { id: '1', name: 'Прокладка кабеля ВВГнг-LS 3х2.5 (штроба)', unit: 'м', quantity: 100, pricePerUnit: 150, total: 15000 },
          { id: '2', name: 'Установка подрозетника (бетон)', unit: 'шт', quantity: 25, pricePerUnit: 350, total: 8750 },
          { id: '3', name: 'Сборка электрощита (до 24 модулей)', unit: 'шт', quantity: 1, pricePerUnit: 8500, total: 8500 },
        ];
      }

      // --- ПАРСЕР РОЗЕТОК ---
      // Ищет слово "розет" и вытаскивает цифру перед ним.
      if (text.includes('розет')) {
        const match = text.match(/(\d+)\s*розет/);
        const qty = match ? parseInt(match[1]) : 1;
        
        generated.push({
          id: '5',
          name: 'Установка и подключение накладной розетки',
          unit: 'шт',
          quantity: qty,
          pricePerUnit: 300,
          total: qty * 300
        });
      }
      
      setEstimateData(generated);
      setIsLoading(false);
    }, 1500);
  };

  const handlePriceChange = (id: string, newPrice: string) => {
    const numPrice = Number(newPrice) || 0;
    setEstimateData(prev => prev?.map(item =>
      item.id === id 
        ? { ...item, pricePerUnit: numPrice, total: numPrice * item.quantity } 
        : item
    ) || null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Смета ВольтПро',
          text: 'Предварительный расчет стоимости.',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Пользователь отменил поделиться', error);
      }
    } else {
      alert('Ваш браузер не поддерживает Share API.');
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans text-foreground pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* --- ПАНЕЛЬ РАЗРАБОТЧИКА --- */}
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex flex-wrap items-center justify-between gap-4 shadow-sm text-sm print:hidden">
          <div className="flex items-center gap-2 text-primary font-medium">
            <Zap className="w-4 h-4" />
            <span>Панель тестирования тарифов</span>
          </div>
          <select 
            value={tariff} 
            onChange={(e) => setTariff(e.target.value as TariffLevel)}
            className="bg-card border border-primary/30 text-foreground rounded-md py-1.5 px-3 focus:outline-none font-semibold"
          >
            <option value="GUEST">Уровень 0: Гость</option>
            <option value="MASTER">Уровень 1: Мастер</option>
            <option value="PRO">Уровень 2: PRO</option>
            <option value="TEAM">Уровень 3: Командный</option>
          </select>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 print:block">
          
          {/* --- ЛЕВАЯ КОЛОНКА --- */}
          <div className="xl:col-span-4 space-y-6 print:hidden">
            
            {/* Настройки сметы */}
            <div className="bg-card p-5 rounded-[var(--radius)] shadow-sm border border-border">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-5 text-foreground">
                <Settings2 className="w-5 h-5 text-primary" />
                Параметры объекта
              </h2>
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Регион / Город</Label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Например: Новосибирск"
                    className="w-full bg-background border border-border rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Тип помещения</Label>
                  <Select value={objectType} onValueChange={setObjectType}>
                    <SelectTrigger className="w-full bg-background border-border h-10">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Квартира (Новостройка)</SelectItem>
                      <SelectItem value="secondary">Квартира (Вторичка)</SelectItem>
                      <SelectItem value="house">Частный дом / Коттедж</SelectItem>
                      <SelectItem value="commercial">Коммерция</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <Label htmlFor="use-my-prices" className="text-sm font-medium text-foreground cursor-pointer">
                    Использовать мои цены
                  </Label>
                  <Switch 
                    id="use-my-prices" 
                    checked={useMyPrices} 
                    onCheckedChange={setUseMyPrices} 
                    disabled={!estimateData || tariff === 'GUEST'} 
                  />
                </div>
              </div>
            </div>

            {/* ИИ-Чат */}
            <div className="bg-card p-5 rounded-[var(--radius)] shadow-sm border border-border flex flex-col h-[400px]">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-foreground">
                <Zap className="w-5 h-5 text-primary" />
                ИИ-Помощник
              </h2>
              
              <div className="flex-1 overflow-y-auto mb-4 bg-background rounded-xl p-4 border border-border text-sm text-foreground flex flex-col justify-end">
                {estimateData ? (
                  <div className="bg-green-500/10 text-green-600 dark:text-green-400 p-3 rounded-lg inline-block font-medium border border-green-500/20">Расчет сформирован по вашему запросу!</div>
                ) : (
                  <p className="text-center text-muted-foreground">Опишите задачу, например: "Гараж 25 кв м, 1 выключатель, 4 светильника, 3 розетки".</p>
                )}
              </div>

              <div className="flex items-end gap-2 bg-background border border-border rounded-xl p-2 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Опишите задачу..."
                  className="flex-1 bg-transparent border-none focus:ring-0 resize-none min-h-[60px] max-h-[120px] p-2 text-sm outline-none text-foreground"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="shrink-0 p-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 h-[44px] w-[44px] flex items-center justify-center mb-1 mr-1"
                >
                  {isLoading ? <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* --- ПРАВАЯ КОЛОНКА --- */}
          <div className="xl:col-span-8 print:col-span-12">
            <div className="bg-card p-4 rounded-t-[var(--radius)] border-b-0 border border-border flex flex-wrap justify-between items-center gap-4 print:hidden">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-foreground">Документ сметы</span>
                <span className="text-xs text-muted-foreground">
                  {tariff === 'GUEST' ? 'Режим просмотра (Гость)' : `Тариф: ${tariff}`}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button onClick={handleShare} disabled={tariff === 'GUEST'} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${tariff === 'GUEST' ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
                  <Share className="w-4 h-4" /> Поделиться
                </button>
                <button onClick={handlePrint} disabled={tariff === 'GUEST'} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${tariff === 'GUEST' ? 'bg-muted text-muted-foreground cursor-not-allowed' : 'bg-primary text-primary-foreground hover:opacity-90'}`}>
                  <Printer className="w-4 h-4" /> PDF
                </button>
              </div>
            </div>

            <div className="bg-card p-6 md:p-8 rounded-b-[var(--radius)] shadow-sm border border-border min-h-[600px] print:shadow-none print:border-none print:p-0 overflow-hidden">
              <div className="border-b border-border pb-6 mb-6 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-black text-foreground mb-1">СМЕТА № {new Date().getTime().toString().slice(-6)}</h1>
                  <p className="text-sm text-muted-foreground">От {new Date().toLocaleDateString('ru-RU')} {region && `| ${region}`}</p>
                </div>
                
                <div className="text-right">
                  {tariff === 'PRO' || tariff === 'TEAM' ? (
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-foreground font-bold">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span contentEditable className="outline-none border-b border-transparent focus:border-primary/50">ООО "Ваша Компания"</span>
                      </div>
                      <span contentEditable className="text-sm text-muted-foreground outline-none border-b border-transparent focus:border-primary/50">+7 (999) 000-00-00</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 text-foreground font-black">
                        <Zap className="w-5 h-5 text-primary" /> ВольтПро
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {!estimateData ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground/50">
                  <FileText className="w-12 h-12 mb-3 opacity-20" />
                  <p>Здесь появится расчет после запроса к ИИ</p>
                </div>
              ) : (
                <div className="overflow-x-auto pb-4">
                  <table className="w-full min-w-[750px] text-sm text-left">
                    <thead className="bg-muted/30 text-muted-foreground text-xs uppercase font-semibold border-y border-border">
                      <tr>
                        <th className="px-4 py-4 whitespace-nowrap">Наименование работ</th>
                        <th className="px-4 py-4 w-20 text-center whitespace-nowrap">Ед.изм</th>
                        <th className="px-4 py-4 w-24 text-center whitespace-nowrap">Кол-во</th>
                        <th className="px-4 py-4 w-32 text-right whitespace-nowrap">Цена за ед.</th>
                        <th className="px-4 py-4 w-36 text-right whitespace-nowrap">Сумма (₽)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {estimateData.map((item) => (
                        <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-4 font-medium text-foreground">{item.name}</td>
                          <td className="px-4 py-4 text-center text-muted-foreground">{item.unit}</td>
                          <td className="px-4 py-4 text-center text-foreground font-semibold">{item.quantity}</td>
                          
                          <td className="px-4 py-4 text-right">
                            {tariff === 'GUEST' ? (
                              <span className="inline-flex items-center gap-1 text-muted-foreground bg-muted px-2 py-1 rounded text-xs whitespace-nowrap">
                                <Lock className="w-3 h-3" /> Скрыто
                              </span>
                            ) : useMyPrices ? (
                              <div className="flex items-center justify-end gap-1">
                                <input
                                  type="number"
                                  min="0"
                                  value={item.pricePerUnit || ''}
                                  onChange={(e) => handlePriceChange(item.id, e.target.value)}
                                  className="w-20 text-right bg-background border border-primary/50 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all font-medium text-foreground"
                                />
                              </div>
                            ) : (
                              <span className="text-muted-foreground whitespace-nowrap">{item.pricePerUnit.toLocaleString('ru-RU')} ₽</span>
                            )}
                          </td>
                          
                          <td className="px-4 py-4 text-right">
                            {tariff === 'GUEST' ? (
                              <span className="inline-flex items-center gap-1 text-muted-foreground bg-muted px-2 py-1 rounded text-xs whitespace-nowrap">
                                <Lock className="w-3 h-3" /> Скрыто
                              </span>
                            ) : (
                              <span className="font-bold text-foreground whitespace-nowrap">{item.total.toLocaleString('ru-RU')} ₽</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-muted/10 border-y border-border font-bold text-foreground text-base">
                        <td colSpan={4} className="px-4 py-5 text-right uppercase text-xs text-muted-foreground tracking-wider">Итого:</td>
                        <td className="px-4 py-5 text-right whitespace-nowrap text-primary">
                          {estimateData.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('ru-RU')} ₽
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  {tariff === 'GUEST' && (
                    <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
                          <Lock className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">Детальные цены скрыты в демо-режиме</h4>
                          <p className="text-sm text-muted-foreground mt-1">Оформите подписку, чтобы увидеть расценки за единицу и сохранить смету в PDF.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estimator;
