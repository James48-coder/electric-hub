import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { 
  Send, 
  Printer, 
  Share, 
  Lock, 
  Zap, 
  ShieldCheck, 
  Settings2,
  FileText,
  User,
  Building2
} from 'lucide-react';

export const Route = createFileRoute('/estimator')({
  component: Estimator,
});

// --- ТИПЫ ДАННЫХ ---
type TariffLevel = 'GUEST' | 'MASTER' | 'PRO' | 'TEAM';

interface EstimateItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

// --- ВРЕМЕННЫЕ МОК-ДАННЫЕ (Пока не подключен реальный CF Worker) ---
const MOCK_ESTIMATE: EstimateItem[] = [
  { id: '1', name: 'Прокладка кабеля ВВГнг-LS 3х2.5', unit: 'м', quantity: 100, pricePerUnit: 150, total: 15000 },
  { id: '2', name: 'Установка подрозетника (бетон)', unit: 'шт', quantity: 25, pricePerUnit: 350, total: 8750 },
  { id: '3', name: 'Сборка электрощита (до 24 модулей)', unit: 'шт', quantity: 1, pricePerUnit: 8500, total: 8500 },
];

function Estimator() {
  // --- СТЕЙТЫ ---
  const [tariff, setTariff] = useState<TariffLevel>('GUEST'); // Для тестирования тарифов
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [estimateData, setEstimateData] = useState<EstimateItem[] | null>(null);
  
  // Настройки сметы
  const [region, setRegion] = useState('moscow');
  const [objectType, setObjectType] = useState('apartment');
  const [useMyPrices, setUseMyPrices] = useState(false);

  // --- ЛОГИКА ИИ (Cloudflare Worker) ---
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    // Имитация запроса к Cloudflare Worker API
    setTimeout(() => {
      setEstimateData(MOCK_ESTIMATE);
      setIsLoading(false);
    }, 1500);
  };

  // --- ЛОГИКА ЭКСПОРТА ---
  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Смета на электромонтажные работы',
          text: 'Ознакомьтесь с предварительным расчетом стоимости работ.',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Пользователь отменил поделиться', error);
      }
    } else {
      alert('Ваш браузер не поддерживает нативный Share API. Попробуйте скопировать ссылку.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900 pb-24">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- ПАНЕЛЬ РАЗРАБОТЧИКА (Переключение тарифов для тестов) --- */}
        <div className="bg-amber-100 border border-amber-300 rounded-lg p-3 flex flex-wrap items-center justify-between gap-4 shadow-sm text-sm print:hidden">
          <div className="flex items-center gap-2 text-amber-800 font-medium">
            <Zap className="w-4 h-4" />
            <span>Панель тестирования тарифов (Только для разработчика)</span>
          </div>
          <select 
            value={tariff} 
            onChange={(e) => setTariff(e.target.value as TariffLevel)}
            className="bg-white border border-amber-300 text-amber-900 rounded-md py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
          >
            <option value="GUEST">Уровень 0: Гость</option>
            <option value="MASTER">Уровень 1: Мастер</option>
            <option value="PRO">Уровень 2: PRO</option>
            <option value="TEAM">Уровень 3: Командный</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:block">
          
          {/* --- ЛЕВАЯ КОЛОНКА: Настройки и ИИ-Чат (Скрывается при печати) --- */}
          <div className="lg:col-span-4 space-y-6 print:hidden">
            
            {/* Блок настроек сметы */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Settings2 className="w-5 h-5 text-blue-600" />
                Параметры объекта
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Регион</label>
                  <select 
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="moscow">Москва и МО</option>
                    <option value="spb">Санкт-Петербург</option>
                    <option value="regions">Регионы РФ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Тип помещения</label>
                  <select 
                    value={objectType}
                    onChange={(e) => setObjectType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="apartment">Квартира (Новостройка)</option>
                    <option value="secondary">Квартира (Вторичка)</option>
                    <option value="house">Частный дом / Коттедж</option>
                    <option value="commercial">Коммерция</option>
                  </select>
                </div>

                {/* CSS-Свитч "Мои цены" (Никаких галочек) */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-slate-700">Использовать мои цены</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={useMyPrices}
                      onChange={() => setUseMyPrices(!useMyPrices)}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Блок ИИ-Чата */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[350px]">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-blue-600" />
                ИИ-Помощник
              </h2>
              
              <div className="flex-1 overflow-y-auto mb-4 bg-slate-50 rounded-lg p-3 border border-slate-100 text-sm text-slate-600 flex flex-col justify-end">
                {estimateData ? (
                  <div className="bg-green-100 text-green-800 p-2 rounded-md inline-block">Смета успешно сгенерирована!</div>
                ) : (
                  <p className="text-center opacity-70">Опишите задачу, например: "Нужна черновая разводка в двушке 60 квадратов, 40 точек, щит на 24 модуля".</p>
                )}
              </div>

              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Опишите задачу..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-20"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="absolute right-2 bottom-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* --- ПРАВАЯ КОЛОНКА: Документ сметы --- */}
          <div className="lg:col-span-8 print:col-span-12">
            
            {/* Панель действий над документом */}
            <div className="bg-white p-4 rounded-t-2xl border-b-0 border border-slate-200 flex justify-between items-center print:hidden">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-800">Документ сметы</span>
                <span className="text-xs text-slate-500">
                  {tariff === 'GUEST' ? 'Режим просмотра (Гость)' : `Тариф: ${tariff}`}
                </span>
              </div>
              
              <div className="flex gap-3">
                {/* Кнопка Поделиться с Тултипом */}
                <div className="relative group inline-block">
                  <div className={tariff === 'GUEST' ? 'pointer-events-auto' : ''}>
                    <button 
                      onClick={handleShare}
                      disabled={tariff === 'GUEST'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                        ${tariff === 'GUEST' 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none' 
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                    >
                      <Share className="w-4 h-4" />
                      Поделиться (VK / SMS)
                    </button>
                  </div>
                  
                  {/* Тултип: Показывается только если тариф GUEST и наведен курсор */}
                  {tariff === 'GUEST' && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block w-64 p-4 bg-slate-900 text-white text-sm rounded-xl shadow-2xl border border-slate-700 z-50 transition-all opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2 mb-2 text-amber-400">
                        <Lock className="w-4 h-4" />
                        <span className="font-bold">Доступно в тарифе Мастер</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Перейдите на тариф «Мастер», чтобы моментально отправлять сметы заказчикам в VK, Telegram или на Email.
                      </p>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-slate-700"></div>
                    </div>
                  )}
                </div>

                {/* Кнопка Печать (PDF) с Тултипом */}
                <div className="relative group inline-block">
                  <div className={tariff === 'GUEST' ? 'pointer-events-auto' : ''}>
                    <button 
                      onClick={handlePrint}
                      disabled={tariff === 'GUEST'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                        ${tariff === 'GUEST' 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed pointer-events-none' 
                          : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                    >
                      <Printer className="w-4 h-4" />
                      Сохранить PDF
                    </button>
                  </div>

                  {/* Тултип: Показывается только если тариф GUEST и наведен курсор */}
                  {tariff === 'GUEST' && (
                    <div className="absolute bottom-full right-0 mb-3 hidden group-hover:block w-64 p-4 bg-slate-900 text-white text-sm rounded-xl shadow-2xl border border-slate-700 z-50 transition-all opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2 mb-2 text-amber-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="font-bold">Профессиональный экспорт</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Сохранение смет в строгом PDF-формате (ГОСТ) с детальными расценками доступно для тарифов «Мастер» и «Pro».
                      </p>
                      <div className="absolute -bottom-1.5 right-12 w-3 h-3 bg-slate-900 rotate-45 border-r border-b border-slate-700"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Сам документ (EstimatePaper) */}
            <div className="bg-white p-6 md:p-10 rounded-b-2xl shadow-sm border border-slate-200 min-h-[600px] print:shadow-none print:border-none print:p-0">
              
              {/* Шапка документа */}
              <div className="border-b border-slate-200 pb-6 mb-6 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 mb-1">СМЕТА № {new Date().getTime().toString().slice(-6)}</h1>
                  <p className="text-sm text-slate-500">От {new Date().toLocaleDateString('ru-RU')}</p>
                </div>
                
                {/* Логика отображения реквизитов зависит от тарифа */}
                <div className="text-right">
                  {tariff === 'PRO' || tariff === 'TEAM' ? (
                    <div className="flex flex-col items-end gap-1 group/edit">
                      <div className="flex items-center gap-1 text-slate-800 font-bold">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        <span contentEditable className="outline-none border-b border-transparent focus:border-blue-300 hover:border-slate-300 transition-colors">ООО "Ваша Компания"</span>
                      </div>
                      <span contentEditable className="text-sm text-slate-600 outline-none border-b border-transparent focus:border-blue-300 hover:border-slate-300 transition-colors">+7 (999) 000-00-00</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded opacity-0 group-hover/edit:opacity-100 transition-opacity print:hidden">Кликните, чтобы изменить (PRO)</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 text-slate-800 font-black">
                        <Zap className="w-5 h-5 text-blue-600" />
                        ВольтПро
                      </div>
                      <span className="text-xs text-slate-500">Сгенерировано в системе</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Таблица работ */}
              {!estimateData ? (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <FileText className="w-12 h-12 mb-3 opacity-20" />
                  <p>Здесь появится расчет после запроса к ИИ</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-y border-slate-200">
                      <tr>
                        <th className="px-4 py-3">Наименование работ</th>
                        <th className="px-4 py-3 w-16 text-center">Ед.изм</th>
                        <th className="px-4 py-3 w-20 text-center">Кол-во</th>
                        <th className="px-4 py-3 w-32 text-right">Цена за ед.</th>
                        <th className="px-4 py-3 w-32 text-right">Сумма (₽)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {estimateData.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-4 font-medium text-slate-800">{item.name}</td>
                          <td className="px-4 py-4 text-center text-slate-500">{item.unit}</td>
                          <td className="px-4 py-4 text-center text-slate-800 font-semibold">{item.quantity}</td>
                          
                          {/* Скрытие цен для Гостя */}
                          <td className="px-4 py-4 text-right">
                            {tariff === 'GUEST' ? (
                              <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-100 px-2 py-1 rounded text-xs">
                                <Lock className="w-3 h-3" /> Скрыто
                              </span>
                            ) : (
                              <span className="text-slate-600">{item.pricePerUnit.toLocaleString('ru-RU')} ₽</span>
                            )}
                          </td>
                          
                          <td className="px-4 py-4 text-right">
                            {tariff === 'GUEST' ? (
                              <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-100 px-2 py-1 rounded text-xs">
                                <Lock className="w-3 h-3" /> Скрыто
                              </span>
                            ) : (
                              <span className="font-bold text-slate-900">{item.total.toLocaleString('ru-RU')} ₽</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-slate-50/80 border-y border-slate-200 font-bold text-slate-900 text-base">
                        <td colSpan={4} className="px-4 py-5 text-right uppercase text-xs text-slate-500 tracking-wider">Итого по работам:</td>
                        <td className="px-4 py-5 text-right whitespace-nowrap text-blue-700">
                          {estimateData.reduce((acc, curr) => acc + curr.total, 0).toLocaleString('ru-RU')} ₽
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  {/* Баннер для Гостя под таблицей */}
                  {tariff === 'GUEST' && (
                    <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-700">
                          <Lock className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-900">Детальные цены скрыты в демо-режиме</h4>
                          <p className="text-sm text-blue-700 mt-1">Оформите подписку, чтобы увидеть расценки за единицу, сохранить смету в PDF и открыть отправку клиенту.</p>
                        </div>
                      </div>
                      <button className="whitespace-nowrap px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors shadow-sm shadow-blue-200">
                        Выбрать тариф
                      </button>
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
